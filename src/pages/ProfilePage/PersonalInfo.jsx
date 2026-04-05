import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider/authProvider";

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);

  // 🎨 Reusable styles
  const inputClass =
    " input-field outline-none mt-1  disabled:bg-gray-100 disabled:cursor-not-allowed";

  const labelClass = "font-light text-[#4B1E2F] text-sm uppercase";

  const sectionTitle =
    "font-semibold text-lg border-t pt-6 border-zinc-300 uppercase";

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

  // ✅ Load user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        addressInfo: {
          address: user.addressInfo?.address || "",
          city: user.addressInfo?.city || "",
          state: user.addressInfo?.state || "",
          postalCode: user.addressInfo?.postalCode || "",
          country: user.addressInfo?.country || "",
        },
        contactDetails: {
          website: user.contactDetails?.website || "",
          facebook: user.contactDetails?.facebook || "",
          instagram: user.contactDetails?.instagram || "",
          youtube: user.contactDetails?.youtube || "",
          github: user.contactDetails?.github || "",
        },
      });
    }
  }, [user]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Submit
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/profile", formData);
      setUser(res.data.user);
      toast.success(res.data.message);
      setEditing(false);
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6  bg-[#F9F9F9] rounded-t-xl">
        <h3 className="font-semibold text-lg">Personal Information</h3>
        <button
          onClick={() => setEditing(!editing)}
          className="text-sm hover:underline cursor-pointer"
        >
          {editing ? "Cancel" : "Update Profile"}
        </button>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-6">

          {/* 🔹 Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className={labelClass}>NAME</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className={labelClass}>USERNAME</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
                placeholder="Enter username"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>BIO</label>
              <input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
                placeholder="Enter bio"
              />
            </div>
          </div>

          {/* 🔹 Address */}
          <div>
            <h2 className={sectionTitle}>Address Info</h2>

            {/* top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <div>
                <label className={labelClass}>ADDRESS</label>
                <input
                  value={formData.addressInfo.address}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "address", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>CITY</label>
                <input
                  value={formData.addressInfo.city}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "city", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>STATE</label>
                <input
                  value={formData.addressInfo.state}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "state", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>
            </div>

            {/* bottom 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className={labelClass}>COUNTRY</label>
                <input
                  value={formData.addressInfo.country}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "country", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>POSTAL CODE</label>
                <input
                  value={formData.addressInfo.postalCode}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "postalCode", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* 🔹 Social */}
          <div>
            <h2 className={sectionTitle}>Social Links</h2>

            {/* top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <div>
                <label className={labelClass}>WEBSITE</label>
                <input
                  value={formData.contactDetails.website}
                  onChange={(e) =>
                    handleNestedChange("contactDetails", "website", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>FACEBOOK</label>
                <input
                  value={formData.contactDetails.facebook}
                  onChange={(e) =>
                    handleNestedChange("contactDetails", "facebook", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>INSTAGRAM</label>
                <input
                  value={formData.contactDetails.instagram}
                  onChange={(e) =>
                    handleNestedChange("contactDetails", "instagram", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>
            </div>

            {/* bottom 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className={labelClass}>YOUTUBE</label>
                <input
                  value={formData.contactDetails.youtube}
                  onChange={(e) =>
                    handleNestedChange("contactDetails", "youtube", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>GITHUB</label>
                <input
                  value={formData.contactDetails.github}
                  onChange={(e) =>
                    handleNestedChange("contactDetails", "github", e.target.value)
                  }
                  disabled={!editing}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          {editing && (
            <div className="flex justify-center pt-4">
              <button type="submit" className="btn-primary">
                Update Now
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalInfo;