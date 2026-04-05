import ProfileCard from "../cards/ProfileCard";
import Modal from "../ui/Modal";

const UserViewModal = ({ isOpen, setOpen, user }) => {
  return (
    <div>
      <Modal
        wClass={"max-w-md"}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      >
        <ProfileCard user={user} />
      </Modal>
    </div>
  );
};

export default UserViewModal;
