import { motion } from "framer-motion";
import {
  Landmark,
  Crown,
  Hammer,
  Gem,
  Sword,
  Flower,
  Flame,
  Calendar,
} from "lucide-react";
import PageHeading from "../../shared/PageHeading";

export default function TempleHistory() {
  return (
    <div className=" min-h-screen py-16 px-4 md:px-10 relative">
      {/* Glow Background */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>


      <div className="container mx-auto">

        <PageHeading section="history" />

        {/* Hero Image */}
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          src="https://doyamoyee.netlify.app/assets/image1-lvr4Vja7.webp"
          alt="Dayamoyee Temple"
          className="rounded-2xl shadow-xl mb-16 w-full"
        />

        {/* Section Component */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <section.icon className="text-red-700 w-8 h-8" />
              <h2 className="text-2xl font-semibold text-red-800">
                {section.title}
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* Timeline */}
        <div className="mt-20">

          <h2 className="text-center text-3xl font-bold text-red-800 mb-12">
            মন্দিরের ঐতিহাসিক সময়রেখা
          </h2>

          <div className="border-l-4 border-red-700 pl-6 space-y-10">

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -left-9 top-1 w-5 h-5 bg-red-700 rounded-full"></div>

                <h3 className="text-xl font-semibold text-red-700">
                  {item.year}
                </h3>

                <p className="text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const sections = [
  {
    icon: Landmark,
    title: "মন্দিরের পরিচিতি",
    content: `ঐতিহ্যবাহী দয়াময়ী মন্দির : সনাতন হিন্দু ধর্মাবলম্বীদের ঐতিহ্যবাহী ধর্মীয় প্রতিষ্ঠানের মধ্যে জামালপুর জেলাসদরে অবস্থিত দয়াময়ী মন্দির অন্যতম। প্রায় সোয়া তিনশ বছর আগে, বাংলা ১১০৪ সনে এই মন্দির প্রতিষ্ঠিত হয়। তখন বাংলার নবাব মুর্শিদ কুলি খান। তার এক বিশ্বস্ত সহচর, ময়মনসিংহ ও জাফরশাহী পরগনার জায়গিরদার শ্রীকৃষ্ণ রায় চৌধুরী শ্রী শ্রী শ্রী (ইশ্বরী) দয়াময়ী মহাদেব্যা মাতার এই মন্দির প্রতিষ্ঠা করেন।`,
  },

  {
    icon: Crown,
    title: "জমিদার পরিবারের পৃষ্ঠপোষকতা",
    content: `শ্রীকৃষ্ণ রায় চৌধুরীর পুত্রবধূ নারায়ণী দেবী চৌধুরানী তৎকালীন বাংলার গভর্নর ওয়ারেন হেস্টিংসের সময়ে এই মন্দিরের ব্যয় নির্বাহের জন্য শ্রীবিগ্রহের নামে পাঁচ হাজার একরেরও বেশি জমি দান করে দেবোত্তর এস্টেট গড়ে তোলেন।`,
  },

  {
    icon: Hammer,
    title: "মন্দির পুনর্নির্মাণ",
    content: `রাজা যোগেন্দ্র কিশোররায় চৌধুরী বর্তমান কাঠামোর এই মন্দির পুনর্নির্মাণ করেন। লোকশ্রুতি আছে— রাণী ধন্যবতী দেবী চৌধুরানী স্বপ্নে নির্দেশ পেয়ে এই মন্দির পুনর্নির্মাণের উদ্যোগ নেন।`,
  },

  {
    icon: Gem,
    title: "মন্দিরের ধনসম্পদ",
    content: `মন্দিরে এক মন ওজনের একটি রৌপ্যনির্মিত সিংহাসন ছিল। মন্দিরে বহু মূল্যবান স্বর্ণালংকার ছিল। ১৯১১ সালে নিরাপত্তার জন্য অলংকার ময়মনসিংহ ট্রেজারিতে জমা রাখা হয়।`,
  },

  {
    icon: Sword,
    title: "মুক্তিযুদ্ধের সময় ক্ষয়ক্ষতি",
    content: `১৯৭১ সালে পাকিস্তানি সেনাবাহিনী মন্দিরে আক্রমণ করে এবং বিস্ফোরক দিয়ে বিগ্রহ ভেঙ্গে ফেলে। পরবর্তীতে ১৯৭৬ সালে স্থানীয় ভক্তদের প্রচেষ্টায় পুনঃপ্রতিষ্ঠা করা হয়।`,
  },

  {
    icon: Flower,
    title: "ধর্মীয় গুরুত্ব",
    content: `দেশ-বিদেশ থেকে ভক্তরা এখানে পূজা করতে আসেন। প্রতিদিন দয়াময়ী মাতার পাশাপাশি শিব ও অন্যান্য দেবদেবীর পূজা হয়।`,
  },

  {
    icon: Flame,
    title: "প্রধান উৎসব",
    content: `দোলযাত্রা, রাসযাত্রা, দুর্গাপূজা, দীপান্বিতা কালীপূজা এবং বাংলা নববর্ষ এখানে বিশেষভাবে উদযাপিত হয়।`,
  },

  {
    icon: Calendar,
    title: "বিশেষ আচার ও পূজা",
    content: `শিব চতুর্দশী, বাসন্তী পূজা, অন্নপূর্ণা পূজা সহ বিভিন্ন ধর্মীয় আচার এখানে পালন করা হয়।`,
  },
];

const timeline = [
  {
    year: "বাংলা ১১০৪",
    text: "দয়াময়ী মন্দির প্রতিষ্ঠা",
  },
  {
    year: "১৮শ শতাব্দী",
    text: "দেবোত্তর এস্টেট প্রতিষ্ঠা ও জমিদারদের পৃষ্ঠপোষকতা",
  },
  {
    year: "১৯১১",
    text: "মন্দিরের অলংকার নিরাপত্তার জন্য ট্রেজারিতে সংরক্ষণ",
  },
  {
    year: "১৯৭১",
    text: "মুক্তিযুদ্ধের সময় মন্দিরে আক্রমণ",
  },
  {
    year: "১৯৭৬",
    text: "মন্দির পুনঃপ্রতিষ্ঠা ও সংস্কার",
  },
];