import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageHeading from "../../shared/PageHeading";
import EventCard from "./EventCard";
import useEvents from "../../hooks/useEvents";
import DataNotFound from "../../components/resuable/DataNotFound";
import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO";

const EventsPage = () => {
  const { events, isLoading } = useEvents();
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All");

  const today = new Date();

  // Ensure consistent event date key: use eventDate
  const filteredItems =
    activeFilter === "All"
      ? events
      : activeFilter === "Upcoming"
        ? events.filter((item) => new Date(item?.eventDate) >= today)
        : events.filter((item) => new Date(item?.eventDate) < today);

  return (
    <div className="relative">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
           <div className="absolute hidden xl:block bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>



      <SEO
        title="Temple Events & Puja | Maa Doyamoyee Temple"
        description="Discover all upcoming and past puja events of Maa Doyamoyee Temple. জানুন সকল পূজা, উৎসব ও ধর্মীয় অনুষ্ঠান সম্পর্কে।"
        url="https://www.maa-doyamoyee.com/events"
        keywords="temple events, puja schedule Bangladesh, Maa Doyamoyee puja, Hindu festival Jamalpur, পূজা উৎসব"
      />

      <div className="custom-container">
        <PageHeading section="events" />

        {!filteredItems.length > 0 ? (
          <DataNotFound name={"events"} isLoading={isLoading} />
        ) : (
          <div>
            {/* Filter Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-7">
              <div className="flex gap-2">
                <button
                  className={`md:px-4 px-2 md:py-2 py-1 border-b-2 transition-all font-semibold cursor-pointer ${
                    activeFilter === "All"
                      ? "border-[#DB4242] text-[#DB4242]"
                      : "border-b-transparent hover:text-[#DB4242]"
                  }`}
                  onClick={() => setActiveFilter("All")}
                >
                  {t("event_filters.all")}
                </button>
                <button
                  className={`md:px-4 px-2 md:py-2 py-1 border-b-2 transition-all font-semibold cursor-pointer ${
                    activeFilter === "Upcoming"
                      ? "border-[#DB4242] text-[#DB4242]"
                      : "border-b-transparent hover:text-[#DB4242]"
                  }`}
                  onClick={() => setActiveFilter("Upcoming")}
                >
                  {t("event_filters.upcoming")}
                </button>
                <button
                  className={`md:px-4 px-2 md:py-2 py-1 border-b-2 transition-all font-semibold cursor-pointer ${
                    activeFilter === "Past Events"
                      ? "border-[#DB4242] text-[#DB4242]"
                      : "border-b-transparent hover:text-[#DB4242]"
                  }`}
                  onClick={() => setActiveFilter("Past Events")}
                >
                  {t("event_filters.past")}
                </button>
              </div>
            </div>

            {/* Grid Gallery */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <EventCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
