import React, { useState } from "react";

const GalleryCard = ({ img }) => {
  const [loaded, setLoaded] = useState(false);
 
  // Cloudinary optimized images
  const img400 = img.img.url.replace("/upload/", "/upload/w_400,f_auto,q_85/");

  const img800 = img.img.url.replace("/upload/", "/upload/w_800,f_auto,q_85/");

  const img1200 = img.img.url.replace(
    "/upload/",
    "/upload/w_1200,f_auto,q_85/",
  );

  const blurImg = img.img.url.replace(
    "/upload/",
    "/upload/w_50,e_blur:300,q_30/",
  );

  return (
    <div className="mb-4  relative">
      {/* Blur Placeholder */}
      <img
        loading="lazy"
        src={blurImg}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover scale-105 blur-md transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Main Image */}
      <figure className="mb-4 relative">
        <a
          href={img.img.url}
          data-fancybox="gallery-public"
          data-caption={img.title}
          className="block h-40 md:h-70 overflow-hidden rounded-lg border border-zinc-200 shadow-lg"
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
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </a>

        <figcaption className="mt-1">
          <h3 className="text-sm font-medium">{img.title}</h3>
          {img.description && (
            <p className="text-xs text-gray-500 line-clamp-2">
              {img.description}
            </p>
          )}
        </figcaption>
      </figure>


    </div>
  );
};

export default GalleryCard;
