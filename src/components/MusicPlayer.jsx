import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  Volume2,
  X,
} from "lucide-react";

const songs = [
  { title: "Nacho Nacho", src: "/audio/nacho.mp3", icon: "🔱" },
  { title: "Kali Mata Theme", src: "/audio/kalimatamusic.mp3", icon: "🌺" },
];

const MusicPlayer = ({ open, setOpen }) => {
  const audioRef = useRef(null);
  const bellRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    const saved = localStorage.getItem("kali_music");
    return saved ? parseInt(saved) : 0;
  });

  const [bellPlayed, setBellPlayed] = useState(false);
  const currentSong = songs[currentSongIndex];

  // Trigger temple bell on first user interaction
  useEffect(() => {
    const playBell = () => {
      if (bellRef.current && !bellPlayed) {
        bellRef.current.volume = 1;
        bellRef.current.play().catch(() => {});
        setBellPlayed(true);
      }
    };

    window.addEventListener("click", playBell);
    window.addEventListener("scroll", playBell);
    window.addEventListener("keydown", playBell);

    return () => {
      window.removeEventListener("click", playBell);
      window.removeEventListener("scroll", playBell);
      window.removeEventListener("keydown", playBell);
    };
  }, [bellPlayed]);

  // Save current song index to localStorage
  useEffect(() => {
    localStorage.setItem("kali_music", currentSongIndex);
  }, [currentSongIndex]);

  // Autoplay music when switching song only if already playing
  useEffect(() => {
    if (audioRef.current && playing) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentSongIndex, playing]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});

    setPlaying(!playing);
  };

  const nextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    setPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
    setPlaying(true);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setPlaying(true);
  };

  const updateProgress = () => {
    if (!audioRef.current?.duration) return;
    setProgress(
      (audioRef.current.currentTime / audioRef.current.duration) * 100,
    );
  };

  const seekSong = (e) => {
    if (!audioRef.current?.duration) return;
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const changeVolume = (e) => {
    const v = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.volume = v;
    setVolume(v);
  };

  return (
    <div>
      {/* Main Music */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={updateProgress}
        onEnded={nextSong}
      />

      {/* Temple Bell */}
      <audio ref={bellRef} autoPlay src="/audio/temple_bell.mp3" />

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
                   bg-linear-to-r from-yellow-500 via-orange-500 to-red-600
                   text-white p-3 md:p-4 rounded-full shadow-xl
                   hover:scale-110 transition"
      >
        <Music size={22} />
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-4 md:right-6
               w-[92vw] sm:w-80 md:w-96
               backdrop-blur-xl bg-white/70
               border border-zinc-200
               shadow-2xl rounded-3xl p-5 z-50
               overflow-hidden"
        >
          {/* Glow background */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/30 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300/20 blur-3xl rounded-full"></div>

          {/* Header */}
          <div className="relative flex justify-between items-center mb-4">
            <h3 className="font-semibold text-orange-800 text-sm tracking-wide">
              🪔 Bhakti Music
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="hover:rotate-90 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Center Visual */}
          <div className="relative flex flex-col items-center mb-4">
            <div
              className={`text-5xl mb-2 transition ${
                playing ? "animate-pulse" : ""
              }`}
            >
              ॐ
            </div>

            <p className="text-xl">{currentSong.icon}</p>
            <p className="text-sm font-medium text-gray-800 text-center">
              {currentSong.title}
            </p>
          </div>

          {/* Progress */}
          <input
            type="range"
            value={progress}
            onChange={seekSong}
            className="w-full accent-orange-500 mb-4"
          />

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mb-4">
            <button onClick={prevSong} className="hover:scale-110 transition">
              <SkipBack size={22} />
            </button>

            <button
              onClick={togglePlay}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
            >
              {playing ? <Pause size={22} /> : <Play size={22} />}
            </button>

            <button onClick={nextSong} className="hover:scale-110 transition">
              <SkipForward size={22} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 mb-4">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="w-full accent-orange-500"
            />
          </div>

          {/* Playlist */}
          <div className="max-h-28 overflow-y-auto text-sm space-y-1 pr-1">
            {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => selectSong(index)}
                className={`cursor-pointer px-3 py-2 rounded-xl transition flex justify-between items-center ${
                  index === currentSongIndex
                    ? "bg-orange-100 text-orange-800 font-medium"
                    : "hover:bg-orange-50"
                }`}
              >
                <span>
                  {song.icon} {song.title}
                </span>
                {index === currentSongIndex && "🎵"}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
