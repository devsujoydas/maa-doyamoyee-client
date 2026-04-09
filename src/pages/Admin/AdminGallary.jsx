import { useState } from "react";
import useGallery from "../../hooks/useGallery";
import GalleryFormModal from "../../components/modals/GallaryFormModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { Plus } from "lucide-react";
import AdminGalleryCard from "../../components/cards/AdminGalleryCard";

const AdminGallery = () => {
  const { gallery, isLoading, createOrUpdate, deleteGallery, isSubmitting } =
    useGallery();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleSubmit = (formData) => {
    createOrUpdate.mutate(
      {
        id: selected?._id,
        formData,
      },
      {
        onSuccess: () => {
          setOpen(false);
          setSelected(null);
        },
      },
    );
  };

  const handleDeleteConfirm = async (id) => {
    await deleteGallery(id);
    setDeleteOpen(false);
    setSelected(null);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1>
          <span className="text-lg md:text-2xl font-bold">
            Gallery Management
          </span>
          <span className="border rounded-full px-3 font-semibold text-sm md:text-lg ml-2">
            {gallery?.length}
          </span>
        </h1>

        <button
          className="btn-primary flex items-center gap-1"
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {gallery.map((item, idx) => (
          <AdminGalleryCard
            key={idx}
            item={item}
            setSelected={setSelected}
            setOpen={setOpen}
            setDeleteOpen={setDeleteOpen}
          />
        ))}
      </div>

      {/* MODALS */}
      <GalleryFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editData={selected}
        loading={isSubmitting}
      />

      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        confirmDelete={handleDeleteConfirm}
        selected={selected}
      />
    </div>
  );
};

export default AdminGallery;
