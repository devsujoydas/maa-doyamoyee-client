import Modal from "../ui/Modal";

const EventViewModal = ({ viewModalOpen, setViewModalOpen, selectedEvent }) => {
  if (!selectedEvent) return null;

  return (
    <Modal wClass="max-w-xl" isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)}>
      <div className="space-y-4">

        <img loading="lazy" src={selectedEvent.image} className="w-full h-60 object-cover rounded-xl" />

        <h2 className="text-xl font-bold text-center">{selectedEvent.title}</h2>

        <p className="text-sm text-gray-600 text-center">{selectedEvent.description}</p>

        <div className="text-center text-xs text-gray-500">
          📅 {selectedEvent.date}
        </div>
      </div>
    </Modal>
  );
};

export default EventViewModal;