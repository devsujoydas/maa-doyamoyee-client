
import { motion, AnimatePresence } from "framer-motion";
import { formatDateDynamic, formatDynamicDate } from "../../utils/formatDateDynamic";
import { HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";



const EventCard = ({ item }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer lang-bn-BD "
        >
            <Link to={`/events/${item._id}`}>
                <img loading="lazy"
                    src={item.image.url}
                    alt={item.title}
                    className="w-full h-56 md:h-80 object-cover transition-transform duration-300 group-active:scale-105 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40  transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-5 duration-300 z-10">
                    <div className="flex items-center gap-2 text-white text-sm text-primary mb-2">
                        📅 {formatDateDynamic(item.eventDate)}
                    </div>
                    <h5 className="text-xl md:text-2xl font-semibold text-white ">{item.title}</h5>
                    <p className="text-sm text-white line-clamp-3">{item.description}</p>
                </div>
            </Link>
        </motion.div>
    )
}

export default EventCard