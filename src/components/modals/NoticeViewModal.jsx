import Modal from "../ui/Modal";

const NoticeViewModal = ({
  viewModalOpen,
  setViewModalOpen,
  selectedNotice,
}) => {
  if (!selectedNotice) return null;

  return (
    <Modal
      wClass="max-w-xl sm:max-w-2xl"
      isOpen={viewModalOpen}
      onClose={() => setViewModalOpen(false)}
    >
      <div className="flex flex-col space-y-4">

        {/* Image */}
        {selectedNotice.thumbnail && (
          <img loading="lazy"
            src={selectedNotice.thumbnail}
            alt={selectedNotice.title}
            className="w-full h-60 object-cover rounded-xl"
          />
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-center lang-bn-BD">
          {selectedNotice.title}
        </h2>

        {/* Meta */}
        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
          <span>📅 {selectedNotice.eventDate}</span>
          <span>🕒 {selectedNotice.eventTime}</span>
          <span>📍 {selectedNotice.venue}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 text-center lang-bn-BD">
          {selectedNotice.description}
        </p>

        {/* Extra */}
        <div className="text-xs text-gray-500 text-center">
          Issued By: {selectedNotice.issuedBy}
        </div>
      </div>
    </Modal>
  );
};

export default NoticeViewModal;