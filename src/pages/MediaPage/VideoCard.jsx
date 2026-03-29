import  { useState } from 'react'
import { motion } from "framer-motion";

const VideoCard = ({ video }) => {
    const [loaded, setLoaded] = useState(false);

    const aspectClass =
        video.type === "reel" ? "aspect-[9/16]" : "aspect-[16/9]";

    return (
        <motion.div
            className={`w-full relative ${aspectClass} break-inside-avoid group`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Skeleton */}
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"></div>
            )}

            <iframe
                src={video.url}
                className="w-full h-full rounded-2xl shadow-xl relative z-10 group-hover:scale-[1.02] transition-all duration-300"
                style={{ border: "none" }}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setLoaded(true)}
            ></iframe>
        </motion.div>
    );
};

export default VideoCard;