import { useEffect, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import GalleryCard from "./GalleryCard";
import PageHeading from "../../shared/PageHeading";
import {  galleryImages, gallerySEO } from "../../data/data";

function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      Thumbs: { autoStart: true },
      Toolbar: { display: ["zoom", "prev", "next", "close"] },
      animated: true,
      dragToClose: true,
    });

    return () => Fancybox.destroy();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(galleryImages.length);
  };

  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <section className=" relative">
      <div className="custom-container">
        <PageHeading section="gallery" />

 
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5 md:mt-8">
          {galleryImages.slice(0, visibleCount).map((img, index) => (
            <GalleryCard
              key={img.id}
              img={img}
              index={index}
              gallerySEO={gallerySEO}
            />
          ))}
        </div>

        {visibleCount < galleryImages.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewMore}
              className="bg-linear-to-r from-yellow-500 to-red-600 
              text-white px-8 py-3 rounded-full font-semibold 
              shadow-lg hover:shadow-xl hover:scale-105 
              transition duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default GalleryPage;
