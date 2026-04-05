import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider/authProvider";

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        addressInfo: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        contactDetails: {
          website: formData.website,
          facebook: formData.facebook,
          instagram: formData.instagram,
          youtube: formData.youtube,
          github: formData.github,
        },
      };

      const res = await api.put("/users/profile", formData); // backend route must match
      const updatedUser = res.data.user;
      // ✅ Update frontend state with backend response
      setUser(updatedUser);

      toast.success("Profile updated successfully!");
      setEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center rounded-t-lg p-6 bg-[#F5F5F5]">
        <h3 className="font-semibold text-lg">Personal Information</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="text-sm hover:underline transition-all cursor-pointer"
        >
          {editing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-6"
      >
        <form onSubmit={handleUpdateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-light text-[#4B1E2F] uppercase">
                NAME
              </label>
              <input
                type="text"
                name="name"
                value={""}
                placeholder="Enter your name"
                disabled={!editing}
                className={`w-full outline-none border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2`}
              />
            </div>
            <div>
              <label className="font-light text-[#4B1E2F] uppercase]">
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                value={""}
                placeholder="Enter your username"
                disabled={!editing}
                className="w-full outline-none border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
              />
            </div>
            <div className="col-span-2">
              <label className="font-light text-[#4B1E2F] uppercase">BIO</label>
              <input
                type="text"
                name="bio"
                placeholder="Enter your bio"
                value={""}
                disabled={!editing}
                className="w-full outline-none border-2 border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
              />
            </div>

            <h1 className="font-semibold text-lg border-t col-span-2 pt-3 border-zinc-300 uppercase">
              address info
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 col-span-2">
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  ADDRESS
                </label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  CITY
                </label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 col-span-full">
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  STATE
                </label>
                <input
                  type="text"
                  placeholder="Enter your state"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  COUNTRY
                </label>
                <input
                  type="text"
                  placeholder="Enter your country"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  POSTAL CODE
                </label>
                <input
                  type="text"
                  placeholder="Enter your postal code"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
            </div>

            <h1 className="font-semibold text-lg uppercase">Social Links</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 col-span-2">
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  website
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="Enter your website url"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Enter your facebook url"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 col-span-full">
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  STATE
                </label>
                <input
                  type="text"
                  name="website"
                  placeholder="Enter your state"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  instagram
                </label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Enter your instagram"
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
              <div>
                <label className="font-light text-[#4B1E2F] uppercase">
                  youtube
                </label>
                <input
                  type="text"
                  name="youtube"
                  placeholder="Enter your youtube "
                  value={""}
                  disabled={!editing}
                  className="w-full outline-none border-2  border-zinc-300 rounded-md p-2.5 md:p-3.5 mt-2"
                />
              </div>
            </div>
          </div>

          {editing && (
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                onClick={handleUpdateProfile}
                className="btn-primary"
              >
                Update Now
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </>
  );
};

export default PersonalInfo;
