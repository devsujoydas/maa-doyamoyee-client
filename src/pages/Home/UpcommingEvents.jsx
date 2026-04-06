import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import SectionHeading from "../../shared/SectionHeading";
import { useTranslation } from "react-i18next";
import { formatDateDynamic } from "../../utils/formatDateDynamic";


const UpcommingEvents = () => {
  const { t } = useTranslation();
  const [upcommingEvents, setUpcommingEvents] = useState([]);

  useEffect(() => {
    const today = new Date();

    fetch("/json/events.json")
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data
          .filter((item) => new Date(item.createdAt) >= today)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .slice(0, 3); // শুধু প্রথম ৩টা

        setUpcommingEvents(upcoming);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="bg-primary text-color-primary">
      <div id="puja" className="py-10 md:py-20 container mx-auto px-4">

        <SectionHeading
          title={t("upcoming_festivals")}
          pathname={t("view_all")}
          path={"/events"} 
        />


        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {upcommingEvents.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-xl overflow-hidden shadow-xl cursor-pointer lang-bn-BD "
              >

                <Link to={`/events/${item._id}`}>
                  <img loading="lazy"
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 md:h-114 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Ribbon */}
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    আসন্ন উৎসব
                  </div>

                  <div className="absolute inset-0 bg-black/30  duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 transform  duration-300 z-10 bg-linear-to-t from-black/70 to-transparent">
                    <div className="flex items-center gap-2 text-white text-sm mb-2">
                      <HiCalendar /> {formatDateDynamic(item.createdAt)}
                    </div>
                    <h5 className="text-xl md:text-2xl font-semibold text-white">
                      {item.title}
                    </h5>
                    <p className="text-sm text-white line-clamp-3">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UpcommingEvents;