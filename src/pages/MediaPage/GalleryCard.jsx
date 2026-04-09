import React, { useState } from "react";

const GalleryCard = ({ img }) => {
  const [loaded, setLoaded] = useState(false);

  // Cloudinary optimized images
  const img400 = img.img.url.replace("/upload/", "/upload/w_400,f_auto,q_auto/");
  const img800 = img.img.url.replace("/upload/", "/upload/w_800,f_auto,q_auto/");
  const img1200 = img.img.url.replace("/upload/", "/upload/w_1200,f_auto,q_auto/");
  const blurImg = img.img.url.replace("/upload/", "/upload/e_blur:2000,q_1/");

  return (
    <div className="mb-4  relative">
      {/* Blur Placeholder */}
      <img
        src={blurImg}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Main Image */}
      <a
        href={img.img.url}
        data-fancybox="gallery-public"
        data-caption={img.title}
        className="relative block"
      >
        <img
          src={img800}
          srcSet={`${img400} 400w, ${img800} 800w, ${img1200} 1200w`}
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          alt={img.altText || img.title}
          title={img.title}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className="w-full rounded-lg transition-transform duration-500 hover:scale-105"
        />
      </a>

      <p className="mt-1 text-sm">{img.title}</p>
    </div>
  );
};

export default GalleryCard;