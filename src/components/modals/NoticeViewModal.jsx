import Modal from "../ui/Modal";
import NoticeCard from "../../pages/NoticePage/NoticeCard";

const NoticeViewModal = ({
  selectedNotice,
  viewModalOpen,
  setViewModalOpen,
  onPreview,
}) => {
  if (!selectedNotice) return null;

  const handlePreview = () => {
    onPreview(selectedNotice); // call preview from parent
  };

  return (
    <Modal
      wClass=" max-w-xl"
      isOpen={viewModalOpen}
      onClose={() => setViewModalOpen(false)}
    >
      <div className="-m-5">
        <NoticeCard notice={selectedNotice} onPreview={handlePreview} />
      </div>
    </Modal>
  );
};

export default NoticeViewModal;