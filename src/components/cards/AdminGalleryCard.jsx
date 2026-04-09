import React, { useState, useEffect } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const AdminGalleryCard = ({ item, setSelected, setOpen, setDeleteOpen }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery-admin']", {});
    return () => Fancybox.unbind("[data-fancybox='gallery-admin']");
  }, []);

  // Cloudinary optimized images
  const img400 = item.img.url.replace("/upload/", "/upload/w_400,f_auto,q_auto/");
  const img800 = item.img.url.replace("/upload/", "/upload/w_800,f_auto,q_auto/");
  const img1200 = item.img.url.replace("/upload/", "/upload/w_1200,f_auto,q_auto/");
  const blurImg = item.img.url.replace("/upload/", "/upload/e_blur:2000,q_1/");

  return (
    <div className="border p-3 border-zinc-200 shadow-lg rounded-md">
      <div className="h-56 w-full overflow-hidden rounded-md relative">
        {/* Blur Placeholder */}
        <img
          src={blurImg}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Main Image */}
        <a
          href={item.img.url}
          data-fancybox="gallery-admin"
          data-caption={item.title}
        >
          <img
            src={img800}
            srcSet={`${img400} 400w, ${img800} 800w, ${img1200} 1200w`}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            alt={item.altText || item.title}
            title={item.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className="relative h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </a>
      </div>

      <p className="mt-2">{item.title}</p>

      <div className="flex gap-2 mt-2">
        <button
          className="btn-primary"
          onClick={() => {
            setSelected(item);
            setOpen(true);
          }}
        >
          Edit
        </button>

        <button
          className="btn-primary bg-red-500"
          onClick={() => {
            setSelected(item);
            setDeleteOpen(true);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminGalleryCard;