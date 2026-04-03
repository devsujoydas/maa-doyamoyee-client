import Modal from "../ui/Modal";
import { formatDateDynamic } from "../../utils/formatDateDynamic";

const NoticeViewModal = ({ viewModalOpen, setViewModalOpen, selectedNotice }) => {
  if (!selectedNotice) return null;

  return (
    <Modal
      wClass="max-w-xl sm:max-w-2xl"
      isOpen={viewModalOpen}
      onClose={() => setViewModalOpen(false)}
    >
      <div className="flex flex-col space-y-4">

        {/* Thumbnail */}
        {selectedNotice.thumbnail && (
          <img
            loading="lazy"
            src={selectedNotice.thumbnail}
            alt={selectedNotice.title}
            className="w-full h-60 object-cover rounded-xl"
          />
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-center lang-bn-BD">
          {selectedNotice.title}
        </h2>

        {/* Event Meta */}
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600">
          {selectedNotice.eventDate && (
            <span>📅 Event Date: {formatDateDynamic(selectedNotice.eventDate)}</span>
          )}
          {selectedNotice.eventTime && (
            <span>🕒 Event Time: {selectedNotice.eventTime}</span>
          )}
          {selectedNotice.venue && <span>📍 Venue: {selectedNotice.venue}</span>}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 text-center lang-bn-BD">
          {selectedNotice.description}
        </p>

        {/* Extra Info */}
        {selectedNotice.issuedBy && (
          <div className="text-xs text-gray-500 text-center">
            Issued By: {selectedNotice.issuedBy}
          </div>
        )}

        {selectedNotice.contactPerson && (
          <div className="text-xs text-gray-500 text-center">
            Contact: {selectedNotice.contactPerson}
          </div>
        )}

        {/* PDF Link */}
        {selectedNotice.pdfUrl && (
          <div className="flex justify-center mt-3">
            <a
              href={selectedNotice.pdfUrl.replace("/view", "/preview")}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
            >
              View PDF
            </a>
          </div>
        )}

        {/* Publish Date */}
        {selectedNotice.createdAt && (
          <div className="text-xs text-gray-400 text-center mt-2">
            Published: {formatDateDynamic(selectedNotice.createdAt)}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NoticeViewModal;