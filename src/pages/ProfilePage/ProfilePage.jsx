// ======================= FULL REFACTORED PROFILE PAGE =======================

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthProvider/authProvider";
import UpdateProfileModal from "./UpdateProfileModal";
import UploadPhotoModal from "./UploadPhotoModal";
import ProfilePageLeft from "./ProfilePageLeft"; 
import PersonalInfo from "./PersonalInfo";
import SecuritySettings from "./SecuritySettings";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [photoType, setPhotoType] = useState("profile");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("personal");

  const handlePhotoUpload = (img) => {
    const field = photoType === "profile" ? "profileImage" : "coverImage";
    setUser((prev) => ({ ...prev, [field]: img }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="custom-container">
        <div className="flex flex-col xl:flex-row gap-6 ">
          {/* ================= LEFT ================= */}
          <ProfilePageLeft
            user={user}
            setUser={setUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setPhotoType={setPhotoType}
            setPhotoModalOpen={setPhotoModalOpen}
            setProfileModalOpen={setProfileModalOpen}
          />

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="xl:w-8/12 bg-white shadow-md flex flex-col gap-4 border border-zinc-200 rounded-lg h-fit"
          >
            {activeTab === "personal" && <PersonalInfo user={user} />}
            {activeTab === "security" && <SecuritySettings />}
        
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <UpdateProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <UploadPhotoModal
        isOpen={photoModalOpen}
        type={photoType}
        onClose={() => setPhotoModalOpen(false)}
        onUpload={handlePhotoUpload}
      />
    </div>
  );
};

export default ProfilePage;
