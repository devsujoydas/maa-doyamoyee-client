import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";
import PageHeading from "../../shared/PageHeading";

const VideoPage = () => {
    const [videoUrls, setVideoUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get("/json/videos.json");
                if (Array.isArray(res.data)) {
                    setVideoUrls(res.data);

                } else {
                    setVideoUrls([]);
                }
            } catch (error) {
                console.error("Failed to load videos:", error);
                setVideoUrls([]);
            } finally {
                setLoading(false);
            }
        };

        getVideos();
    }, []);

    return (
        <div className="relative">
            <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
            <div className="custom-container">
                <PageHeading section="videos" />


                {loading && (
                    <div className="text-center text-gray-500">Loading videos...</div>
                )}
 
                {!loading && (
                    <div className="columns-1 sm:columns-3 lg:columns-4 gap-6 space-y-6  mt-5 md:mt-8">
                        {videoUrls.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                )}
 
                {!loading && videoUrls.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        No videos found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPage;



