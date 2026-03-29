import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { motion } from "framer-motion";

const GalleryCard = ({ img, gallerySEO }) => {
  const [loaded, setLoaded] = useState(false);
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, duration: 0.5 },
    }),
  };

  // responsive images
  const img400 = img.imgUrl.replace("/upload/", "/upload/w_400,f_auto,q_auto/");
  const img800 = img.imgUrl.replace("/upload/", "/upload/w_800,f_auto,q_auto/");
  const img1200 = img.imgUrl.replace(
    "/upload/",
    "/upload/w_1200,f_auto,q_auto/",
  );

  const fullImage = img.imgUrl.replace(
    "/upload/",
    "/upload/w_1600,f_auto,q_auto/",
  );

  // blur placeholder
  const blurImg = img.imgUrl.replace("/upload/", "/upload/e_blur:2000,q_1/");

  const altText = `${img.place} - ${gallerySEO.alt}`;
  const titleText = `${img.place} - ${gallerySEO.title}`;

  return (
    <motion.a
      href={fullImage}
      data-fancybox="gallery"
      data-caption={titleText}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={itemVariants}
      className="group relative block mb-4 overflow-hidden rounded-xl"
    >
      {/* Blur background */}

      <img loading="lazy"
        src={blurImg}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Main Image */}

      <img loading="lazy"
        src={img800}
        srcSet={`${img400} 400w, ${img800} 800w, ${img1200} 1200w`}
        sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
        alt={altText}
        title={titleText}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="relative w-full h-full object-cover transition duration-500 group-hover:scale-110"
      />

      {/* Hover Overlay */}

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
        <FiZoomIn className="text-white text-3xl" />
      </div>
    </motion.a>
  );
};

export default GalleryCard;
