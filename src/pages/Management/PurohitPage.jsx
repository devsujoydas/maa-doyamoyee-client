import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import { purohitsData } from "../../data/data";

const PurohitPage = () => {


  return (
    <section className="relative">
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div>
      <div className="custom-container">
        <PageHeading section="purohit" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 lg:gap-8 xl:gap-10 my-10">
          {purohitsData.map((pandit, index) => (
            <motion.div
              key={pandit.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 bg-white/30 backdrop-blur-sm"
            >

              {/* Image halo */}
              <div className="pt-10 pb-3 flex flex-col items-center relative lang-bn-BD">
                <div className="absolute -top-4 w-32 h-32 bg-yellow-100/40 rounded-full blur-2xl"></div>
                <div className="relative w-28 h-28 rounded-full bg-yellow-50 flex items-center justify-center shadow-inner z-10">
                  <img loading="lazy"
                    src={pandit.image}
                    alt={pandit.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                  />
                </div>

                <h3 className="mt-4 text-xl font-bold text-gray-900 z-10 relative text-center">
                  {pandit.name}
                </h3>

                <p className="text-yellow-700 font-medium z-10 relative text-center">
                  {pandit.designation}
                </p>
              </div>

              {/* Info */}
              <div className="p-8 text-sm text-gray-700 space-y-3">

                <div className="flex justify-between">
                  <span className="font-medium">অভিজ্ঞতা</span>
                  <span>{pandit.experience}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">বিশেষ দক্ষতা</span>
                  <span className="text-right">{pandit.speciality}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">উপস্থিতি</span>
                  <span className="text-right">{pandit.availableDays}</span>
                </div>

                {/* নতুন info rows: ফোন ও ইমেইল */}
                <div className="flex justify-between">
                  <span className="font-medium">ফোন</span>
                  <span>
                    <a href={`tel:${pandit.phone}`} className="text-blue-600 hover:underline">
                      {pandit.phone}
                    </a>
                  </span>
                </div>

                {pandit.email && (
                  <div className="flex justify-between">
                    <span className="font-medium">ইমেইল</span>
                    <span>
                      <a href={`mailto:${pandit.email}`} className="text-blue-600 hover:underline">
                        {pandit.email}
                      </a>
                    </span>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="pt-4 flex gap-3 justify-center">
                  <a
                    href={`tel:${pandit.phone}`}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition text-xs"
                  >
                    কল করুন
                  </a>

                  {pandit.email && (
                    <a
                      href={`mailto:${pandit.email}`}
                      className="px-4 py-2 border border-yellow-600 text-yellow-700 rounded-full hover:bg-yellow-50 transition text-xs"
                    >
                      ইমেইল
                    </a>
                  )}
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PurohitPage;