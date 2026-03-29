import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageHeading from "../../shared/PageHeading";
import EventCard from "./EventCard";



const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Upcoming", "Past Events"];
  
  useEffect(() => {
    fetch("/json/events.json")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const today = new Date();

  const filteredItems =
    activeFilter === "All"
      ? events
      : activeFilter === "Upcoming"
        ? events.filter((item) => new Date(item.date) >= today)
        : events.filter((item) => new Date(item.date) < today);



  return (
    <div className="relative">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
      <div className="custom-container">
        <PageHeading section="events" />


        <div className="flex flex-col md:flex-row justify-center items-center mb-6 md:mb-8">
          <div className="flex gap-2 ">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`md:px-4 px-2 md:py-2 py-1 border-b-2   transition-all  font-semibold cursor-pointer ${activeFilter === filter
                  ? "border-[#DB4242]  text-[#DB4242]"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => <EventCard key={idx} item={item} />)}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;