import { motion } from "framer-motion";
import PageHeading from "../../shared/PageHeading";
import { advisorsData } from "../../data/data";

const AdvisorsPage = () => {


  return (
    <section className="relative"> 
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-red-600 blur-3xl opacity-20 rounded-full"></div> 
      <div className="custom-container"> 
        <PageHeading section="advisors" />

        

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 my-10">

          {advisorsData.map((advisor, index) => (
            <motion.div
              key={advisor.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .4, delay: index * .03 }}

              className="relative group bg-white/80 backdrop-blur border border-yellow-500/30 
              rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 
              transition-all duration-500 lang-bn-BD"
            >

              {/* Top Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 
              bg-linear-to-r from-yellow-500 to-red-700 text-white 
              px-3 py-1 rounded-full text-xs shadow-md">
                উপদেষ্টা
              </div>

              {/* Glow Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
              bg-linear-to-r from-yellow-400/10 to-red-600/10 
              transition duration-500"></div>

              {/* Content */}
              <div className="relative border-l-4 border-yellow-600 pl-4 space-y-2">

                <h3 className="text-lg font-semibold text-gray-900 
                 leading-snug">
                  {advisor.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {advisor.address}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default AdvisorsPage;