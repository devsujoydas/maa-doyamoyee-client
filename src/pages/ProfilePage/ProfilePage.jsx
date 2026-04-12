// ======================= FULL REFACTORED PROFILE PAGE =======================

import   {  useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../AuthProvider/authProvider";  
import ProfilePageLeft from "./ProfilePageLeft"; 
import PersonalInfo from "./PersonalInfo";
import SecuritySettings from "./SecuritySettings";

const ProfilePage = () => {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("personal");


  return (
    <div className="relative bg-gray-50">

      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
           <div className="absolute hidden xl:block bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>



      <div className="custom-container">
        <div className="flex flex-col xl:flex-row gap-6 ">
          {/* ================= LEFT ================= */}
          <ProfilePageLeft
            user={user}
            setUser={setUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab} 
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

      
    </div>
  );
};

export default ProfilePage;
