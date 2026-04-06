import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import EventDetailsSideBar from "./EventDetailsSideBar";
import { formatDateDynamic } from "../../utils/formatDateDynamic";
import { useTranslation } from "react-i18next";
import useEvents from "../../hooks/useEvents";

const EventDetailsPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const [event, setevent] = useState([]);
  const { events } = useEvents();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Fancybox.bind("[data-fancybox='event-gallery']", {});

    fetch("/json/events.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item._id === id);
        setevent(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    return () => Fancybox.unbind("[data-fancybox='event-gallery']");
  }, [id]);

  if (loading)
    return <p className="text-center py-20 text-gray-500">Loading...</p>;

  if (!event)
    return <p className="text-center py-20 text-gray-500">event not found.</p>;

  return (
    <div className="relative ">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <div className="custom-container">
        <button
          onClick={() => navigate("/events")}
          className="inline-block cursor-pointer mb-8 text-indigo-600 hover:underline"
        >
          ← {t("back_to_all_posts")}
        </button>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex flex-col lg:flex-row gap-8"
        >
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 ">
                {event.title}
              </h1>

              {/* Date */}
              {event.createdAt && (
                <p className="text-gray-500 mb-6">
                  <FaCalendarAlt className="inline mr-2" />
                  {formatDateDynamic(event.createdAt)}
                </p>
              )}

              {/* Main Image */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-inner">
                <a
                  href={event.image}
                  data-fancybox="event-gallery"
                  data-caption={event.title}
                >
                  <img
                    loading="lazy"
                    src={event.image}
                    alt={event.title}
                    className="w-full max-h-125 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <EventDetailsSideBar
            events={events.filter((n) => n.id !== event.id).slice(0, 3)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
