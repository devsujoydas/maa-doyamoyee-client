import NoticeCard from "../../pages/NoticePage/NoticeCard";
import Modal from "../ui/Modal";

const NoticeViewModal = ({ isOpen, onClose, notice, onPreview }) => {
  if (!isOpen || !notice) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass="max-w-xl">
      <div className="-m-6">
      <NoticeCard notice={notice} onPreview={onPreview} />
      </div>
    </Modal>
  );
};

export default NoticeViewModal;