import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../AuthProvider/authProvider";
import { useTranslation } from "react-i18next";

const PersonalInfo = () => {
  const { user, setUser } = useAuth();
  const { t } = useTranslation();

  const [editing, setEditing] = useState(false);

  const inputClass =
    "input-field outline-none mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed";

  const labelClass = "font-light text-[#4B1E2F] text-sm uppercase";

  const sectionTitle =
    "font-semibold text-lg border-t pt-6 border-zinc-300 uppercase";

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    phone: "",
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

  // Load user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        phone: user.phone || "",
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put("/users/profile", formData);

      setUser(res.data.user);

      toast.success(t("profile_updated_success"));

      setEditing(false);
    } catch (err) {
      toast.error(t("profile_update_failed"));
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 bg-[#F9F9F9] rounded-t-xl">
        <h3 className="font-semibold text-lg">{t("personal_information")}</h3>

        <button
          onClick={() => setEditing(!editing)}
          className="text-sm hover:underline cursor-pointer"
        >
          {editing ? t("cancel") : t("update_profile")}
        </button>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* BASIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t("name")}</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>{t("username")}</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t("bio")}</label>
              <input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!editing}
                className={inputClass}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <h2 className={sectionTitle}>{t("address_info")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <div>
                <label className={labelClass}>{t("address")}</label>
                <input
                  name="address"
                  placeholder={t("address")}
                  value={formData.addressInfo.address}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "address", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{t("city")}</label>

                <input
                  placeholder={t("city")}
                  name="city"
                  value={formData.addressInfo.city}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "city", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{t("state")}</label>

                <input
                  placeholder={t("state")}
                  value={formData.addressInfo.state}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "state", e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className={labelClass}>{t("country")}</label>

                <input
                  name="country"
                  placeholder={t("country")}
                  value={formData.addressInfo.country}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange("addressInfo", "country", e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{t("postal_code")}</label>
                <input
                  name="postal_code"
                  placeholder={t("postal_code")}
                  value={formData.addressInfo.postalCode}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "addressInfo",
                      "postalCode",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* CONTACTS */}
          <div>
            <h2 className={sectionTitle}>{t("contacts")}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <div>
                <label className={labelClass}>{t("phone")}</label>

                <input
                  name="phone"
                  placeholder={t("phone")}
                  value={formData.phone}
                  disabled={!editing}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t("website")}</label>

                <input
                  name="website"
                  placeholder={t("website")}
                  value={formData.contactDetails.website}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "contactDetails",
                      "website",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t("facebook")}</label>

                <input
                  name="facebook"
                  placeholder={t("facebook")}
                  value={formData.contactDetails.facebook}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "contactDetails",
                      "facebook",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
              <div>
                <label className={labelClass}>{t("instagram")}</label>
                <input
                  name="instagram"
                  placeholder={t("instagram")}
                  value={formData.contactDetails.instagram}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "contactDetails",
                      "instagram",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{t("youtube")}</label>

                <input
                  name="youtube"
                  placeholder={t("youtube")}
                  value={formData.contactDetails.youtube}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "contactDetails",
                      "youtube",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{t("github")}</label>
                <input
                  name="github"
                  placeholder={t("github")}
                  value={formData.contactDetails.github}
                  disabled={!editing}
                  onChange={(e) =>
                    handleNestedChange(
                      "contactDetails",
                      "github",
                      e.target.value,
                    )
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          {editing && (
            <div className="flex justify-center pt-4">
              <button type="submit" className="btn-primary">
                {t("update_now")}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalInfo;
