import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, X } from "lucide-react";

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
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
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
                     bg-linear-to-br from-yellow-50 to-orange-100
                     border-2 border-yellow-400
                     shadow-2xl rounded-2xl p-4 z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-orange-800">🪔 Kali Bhakti Music</h3>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* OM Symbol */}
          <div className="flex justify-center mb-3">
            <div className={`text-5xl ${playing ? "animate-pulse" : ""}`}>ॐ</div>
          </div>

          {/* Song Icon & Title */}
          <p className="text-center text-lg mb-1">{currentSong.icon}</p>
          <p className="text-center text-sm font-medium text-orange-900 mb-2">
            {currentSong.title}
          </p>

          {/* Equalizer */}
          {playing && (
            <div className="flex justify-center gap-1 mb-3">
              <div className="w-1 h-4 bg-orange-500 animate-bounce"></div>
              <div className="w-1 h-6 bg-orange-600 animate-bounce delay-75"></div>
              <div className="w-1 h-3 bg-orange-500 animate-bounce delay-150"></div>
              <div className="w-1 h-5 bg-orange-600 animate-bounce delay-200"></div>
            </div>
          )}

          {/* Progress Bar */}
          <input
            type="range"
            value={progress}
            onChange={seekSong}
            className="w-full mb-3"
          />

          {/* Controls */}
          <div className="flex justify-center gap-4 mb-4">
            <button onClick={prevSong}>
              <SkipBack size={22} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-orange-500 text-white p-3 rounded-full shadow"
            >
              {playing ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={nextSong}>
              <SkipForward size={22} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 mb-3">
            <Volume2 size={18} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={changeVolume}
              className="w-full"
            />
          </div>

          {/* Playlist */}
          <div className="max-h-28 overflow-y-auto text-sm">
            {songs.map((song, index) => (
              <div
                key={index}
                onClick={() => selectSong(index)}
                className={`cursor-pointer px-2 py-1 rounded ${
                  index === currentSongIndex
                    ? "bg-orange-200 text-orange-800"
                    : "hover:bg-orange-100"
                }`}
              >
                {song.icon} {song.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;