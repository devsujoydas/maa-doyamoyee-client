import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import EventViewModal from "../../components/modals/EventViewModal";
import EventAddModal from "../../components/modals/EventAddModal"; 
import DeleteModal from "../../components/modals/DeleteModal";  
import useEvents from "../../hooks/useEvents";

const AdminEvents = () => { 
   const { data: events = [] } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const openViewModal = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => { 
    toast.success("Event deleted");
    setDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-6">
      <SEOHead
        title="Event Management"
        description="Manage events."
        path="/admin/events"
      />

      <div className="flex justify-between items-center">
        <h1 className="">
          <span className="text-lg md:text-2xl font-bold">
            Events Management{" "}
          </span>
          <span className="border rounded-full px-1 font-semibold text-sm md:text-lg lang-en-US">
            {events.length}
          </span>
        </h1>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1 sm:gap-2 bg-[#CF4517] hover:bg-[#e24e1c] active:scale-95  transition-all text-white cursor-pointer px-2 sm:px-4 py-2 rounded-md sm:text-base text-sm sm:rounded-lg"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase ">
                Event
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase ">
                Description
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase ">
                Date
              </th>
              <th className="px-6 py-3 text-left  font-medium text-gray-500 uppercase ">
                Status
              </th>
              <th className="px-6 py-3 text-center  font-medium text-gray-500 uppercase ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className=" divide-y divide-gray-200 ">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium lang-bn-BD  text-nowrap">
                  {event.title}
                </td>
                <td className="px-6 py-4 text-sm lang-bn-BD  text-nowrap">
                  {event.description.length > 50
                    ? event.description.slice(0, 50) + "..."
                    : event.description}
                </td>

                <td className="px-6 py-4 text-xs text-gray-500  text-nowrap">
                  {event.createdAt}
                </td>

                <td className="px-6 py-4 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full
                    ${event.upcoming ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                  `}
                  >
                    {event.upcoming ? "Upcoming" : "Past"}
                  </span>
                </td>

                <td className="px-6 py-4 flex justify-center gap-3">
                  <button
                    className="text-blue-600 cursor-pointer"
                    onClick={() => openViewModal(event)}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={() => openDeleteModal(event)}
                  >
                    <HiTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Modals */}
      <EventViewModal
        viewModalOpen={viewModalOpen}
        setViewModalOpen={setViewModalOpen}
        selectedEvent={selectedEvent}
      />

      <DeleteModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        confirmDelete={confirmDelete}
        selected={selectedEvent}
      />

      <EventAddModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen} 
        events={events}
      />
    </div>
  );
};

export default AdminEvents;
