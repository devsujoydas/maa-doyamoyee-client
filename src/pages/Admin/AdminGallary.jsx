// src/pages/Admin/AdminGallery.jsx
import React, { useState } from "react";
import { Plus, Edit2, Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useGallery, useDeleteGallery } from "../../hooks/useGallery"; 
import GalleryFormModal from "../../components/modals/GallaryFormModal";

const AdminGallery = () => {
  const { data: gallery = [] } = useGallery();
  const { mutate: deleteGallery } = useDeleteGallery();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this gallery?")) return;

    deleteGallery(id, {
      onSuccess: () => toast.success("Deleted successfully"),
      onError: (err) => toast.error(err.message || "Failed to delete"),
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-lg md:text-2xl font-bold">
          Gallery{" "}
          <span className="border rounded-full px-3 font-semibold text-sm md:text-lg ml-2">
            {gallery.length}
          </span>
        </h1>

        <button
          className="btn-primary"
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item._id} className="border p-3 rounded">
            {item.images[0] && (
              <img
                src={item.images[0].imageUrl}
                className="h-40 w-full object-cover rounded"
                alt={item.images[0].altText}
              />
            )}
            <h2 className="font-semibold mt-2">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.category}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setEditData(item);
                  setOpen(true);
                }}
                className="btn-sm"
              >
                <Edit2 size={14} />
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="btn-sm text-red-500"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <GalleryFormModal
        isOpen={open}
        onClose={() => setOpen(false)}
        editData={editData}
      />
    </div>
  );
};

export default AdminGallery;