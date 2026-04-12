// HistoryPage.jsx (History Book Style)
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { History, Book, Users, Calendar, Heart } from "lucide-react";
import PageHeading from "../../shared/PageHeading";
import SEO from "../../components/SEO";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const HistoryPage = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: "History",
      icon: <History className="w-5 h-5 text-gray-700" />,
      content: t("temple.history"),
    },
    {
      title: "Deities",
      icon: <Heart className="w-5 h-5 text-gray-700" />,
      content: t("temple.deities"),
    },
    {
      title: "Rituals",
      icon: <Book className="w-5 h-5 text-gray-700" />,
      content: t("temple.rituals"),
    },
    {
      title: "Annual Festivals",
      icon: <Calendar className="w-5 h-5 text-gray-700" />,
      content: t("temple.annual_festivals"),
    },
    {
      title: "Special Rituals",
      icon: <Heart className="w-5 h-5 text-gray-700" />,
      content: t("temple.special_rituals"),
    },
    {
      title: "Management & Governance",
      icon: <Users className="w-5 h-5 text-gray-700" />,
      content: `${t("temple.management_history")}\n\n${t("temple.governance")}\n\n${t("temple.development")}`,
    },
    {
      title: "National Events",
      icon: <Calendar className="w-5 h-5 text-gray-700" />,
      content: t("temple.national_events"),
    },
    {
      title: "Library & Scholarship",
      icon: <Book className="w-5 h-5 text-gray-700" />,
      content: t("temple.library_scholarship"),
    },
  ];

  return (
    <div className="custom-container text-gray-800 ">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute hidden xl:block bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>

      <PageHeading title={t("temple.name")} desc={t("temple.location")} />

      <SEO
        title="History of Maa Doyamoyee Temple | মন্দিরের ইতিহাস"
        description="শ্রী শ্রীঁ রী দয়াময়ী মন্দিরের ইতিহাস, প্রতিষ্ঠা, ঐতিহ্য ও ধর্মীয় গুরুত্ব সম্পর্কে বিস্তারিত জানুন। Learn about Maa Doyamoyee Temple history in Jamalpur."
        url="https://maa-doyamoyee.vercel.app/history"
        keywords="Maa Doyamoyee history, temple history Bangladesh, Jamalpur temple history, মন্দিরের ইতিহাস, Hindu temple history"
      />

     
      {/* Sections */}
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          className=" mb-6 md:mb-9 last:mb-0"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-justify leading-relaxed whitespace-pre-line text-sm md:text-lg">
            {section.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default HistoryPage;
