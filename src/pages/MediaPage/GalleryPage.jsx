import React, { useEffect } from "react";
import useGallery from "../../hooks/useGallery";
import PageHeading from "../../shared/PageHeading";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import GalleryCard from "./GalleryCard";
import { useTranslation } from "react-i18next";
import DataNotFound from "../../components/resuable/DataNotFound";

const GalleryPage = () => {
  const { gallery } = useGallery();
  const { t } = useTranslation();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery-public']", {});
    return () => Fancybox.unbind("[data-fancybox='gallery-public']");
  }, []);

  const newImages = gallery.filter((img) => img.eventDate);
  const oldImages = gallery
    .filter((img) => !img.eventDate)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

 
  return (
    <div className="relative">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="gallery" />
        {!gallery.length > 0 ? (
          <DataNotFound name={"events"} />
        ) : (
          <div>
            {/* New Images */}
            <h2 className="text-xl font-bold mb-3">
              {t("gallery.newImages.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newImages.map((img) => (
                <GalleryCard key={img._id} img={img} />
              ))}
            </div>

            {/* Old Images */}
            <h2 className="text-xl font-bold mt-8 mb-3">
              {t("gallery.oldImages.title")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {oldImages.map((img) => (
                <GalleryCard key={img._id} img={img} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
