// UpdateProfileModal.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthProvider/authProvider";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import Modal from "../../components/ui/Modal";
import api from "../../utils/api";

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    addressInfo: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    contactDetails: {
      website: "",
      facebook: "",
      instagram: "",
      youtube: "",
      github: "",
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        addressInfo: { ...user.addressInfo },
        contactDetails: { ...user.contactDetails },
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        addressInfo: { ...prev.addressInfo, [key]: value },
      }));
    } else if (name.includes("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactDetails: { ...prev.contactDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Call backend update profile service
      const res = await api.put("/users/profile", formData); // backend route must match
      const updatedUser = res.data.user; 
      // ✅ Update frontend state with backend response
      setUser(updatedUser);

      toast.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Update failed");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} wClass={"max-w-5xl"}>
      <div className="bg-white rounded-xl max-h-[90vh] overflow-auto sm:p-3 relative ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {["name", "username"].map((field) => (
              <div key={field} className="">
                <label className="block text-sm font-bold uppercase mb-1">
                  {field}
                </label>
                <input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="relative mt-1 outline-none border border-zinc-300 rounded-full  px-4 py-2.5 md:px-4 md:py-3 flex items-center w-full"
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold uppercase mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full relative mt-1 border border-zinc-300 rounded-lg outline-none  px-4 py-2.5 md:px-4 md:py-3 flex items-center"
            />
          </div>

          {/* Address */}
          <div>
            <h3 className="font-bold uppercase mb-2">Address Info</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {["address", "city", "state", "postalCode", "country"].map(
                (f) => (
                  <div key={f}>
                    <label className="block text-sm font-bold uppercase mb-1">
                      {f}
                    </label>
                    <input
                      name={`address.${f}`}
                      value={formData.addressInfo[f]}
                      onChange={handleChange}
                      className="w-full relative outline-none mt-1 border border-zinc-300 rounded-full  px-4 py-2.5 md:px-4 md:py-3 flex items-center"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold uppercase mb-2">Social Links</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {["website", "facebook", "instagram", "youtube", "github"].map(
                (f) => (
                  <div key={f}>
                    <label className="block text-sm font-bold uppercase mb-1">
                      {f}
                    </label>
                    <input
                      name={`contact.${f}`}
                      value={formData.contactDetails[f]}
                      onChange={handleChange}
                      className="w-full relative outline-none mt-1 border border-zinc-300 rounded-full  px-4 py-2.5 md:px-4 md:py-3 flex items-center"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition shadow"
          >
            Update Profile
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateProfileModal;
