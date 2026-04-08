import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageHeading from "../../shared/PageHeading";
import EventCard from "./EventCard";
import useEvents from "../../hooks/useEvents";

const EventsPage = () => {
  const { events } = useEvents();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Upcoming", "Past Events"];
  const today = new Date();

  // Ensure consistent event date key: use eventDate
  const filteredItems =
    activeFilter === "All"
      ? events
      : activeFilter === "Upcoming"
      ? events.filter((item) => new Date(item.eventDate) >= today)
      : events.filter((item) => new Date(item.eventDate) < today);

  return (
    <div className="relative">
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <PageHeading section="events" />

        {/* Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-8">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`md:px-4 px-2 md:py-2 py-1 border-b-2 transition-all font-semibold cursor-pointer ${
                  activeFilter === filter
                    ? "border-[#DB4242] text-[#DB4242]"
                    : "border-b-transparent hover:text-[#DB4242]"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Gallery */}
        {events.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No events found.</p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default EventsPage;