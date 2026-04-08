import { formatDateDynamic } from "../../utils/formatDateDynamic";
import Modal from "../ui/Modal";

const EventViewModal = ({ isOpen, onClose, selectedEvent }) => {
  if (!selectedEvent) return null;
  return (
    <Modal wClass="max-w-xl" isOpen={isOpen} onClose={() => onClose(false)}>
      <div className="space-y-4">

        <img loading="lazy" src={selectedEvent.image.url} className="w-full h-60 object-cover rounded-xl" />

        <h2 className="text-xl font-bold text-center">{selectedEvent.title}</h2>

        <p className="text-sm text-gray-600 text-center">{selectedEvent.description}</p>

        <div className="text-center text-xs text-gray-500">
          📅 {formatDateDynamic(selectedEvent.eventDate)}
        </div>
      </div>
    </Modal>
  );
};

export default EventViewModal;