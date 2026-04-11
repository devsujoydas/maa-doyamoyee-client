import { useState } from "react";
import SEOHead from "../../components/SEOHead";
import { HiTrash } from "react-icons/hi";
import { Eye, Plus, Edit, Edit2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import EventViewModal from "../../components/modals/EventViewModal";
import EventFormModal from "../../components/modals/EventFormModal";
import DeleteModal from "../../components/modals/DeleteModal";
import useEvents from "../../hooks/useEvents";
import { formatDateDynamic } from "../../utils/formatDateDynamic"; 
import LoadingSpinner from "../../components/LoadingSpinner";

const AdminEvents = () => {
  const { events, deleteEvent,isLoading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Open view modal
  const openViewModal = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  // Open form modal for edit
  const openEditModal = (event) => {
    setEditData(event);
    setFormModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast.success("Event deleted successfully");
    } catch {
      toast.error("Failed to delete event");
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <SEOHead
        title="Event Management"
        description="Manage events."
        path="/admin/events"
      />

      <div className="flex justify-between items-center">
        <h1 className=" text-lg md:text-2xl font-bold">
          Events Management ({events.length})
        </h1>

        <button
          onClick={() => {
            setEditData(null);
            setFormModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-white shadow rounded-lg"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-xs">
              <tr>
                <th className="px-6 py-3 text-left">SL</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Event
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {events.map((event, idx) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-nowrap">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-nowrap">
                    {event.description.length > 50
                      ? event.description.slice(0, 50) + "..."
                      : event.description}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 text-nowrap">
                    {formatDateDynamic(event.eventDate)}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        event.upcoming
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {event.upcoming ? "Upcoming" : "Past"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      onClick={() => openViewModal(event)}
                    >
                      <Eye size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      onClick={() => openEditModal(event)}
                    >
                      <Edit2 size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => openDeleteModal(event)}
                    >
                      <HiTrash size={18} />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Modals */}
      <EventViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        selectedEvent={selectedEvent}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        confirmDelete={confirmDelete}
        selected={selectedEvent}
      />

      <EventFormModal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        initialData={editData}
      />
    </div>
  );
};

export default AdminEvents;
