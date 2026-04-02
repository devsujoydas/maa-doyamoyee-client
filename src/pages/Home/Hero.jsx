import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css"; 
import LinkButton from "../../components/ui/LinkButton";

const Hero = () => {
  const { t } = useTranslation();

  const heroBanner = [
    { url: "/banner/banner1.webp" },
    { url: "/banner/banner2.webp" },
    { url: "/banner/banner3.webp" },
    { url: "/banner/banner4.webp" },
    { url: "/banner/banner5.webp" },
    { url: "/banner/banner6.webp" },
    { url: "/banner/banner7.webp" },
    { url: "/about/tample-about.webp" },
  ];
  const heroBannerforsm = [
    {
      url: "https://res.cloudinary.com/dpdsgroa7/image/upload/v1773583586/image38_p0mylr.webp",
    },
    { url: "/banner/bannerforsm2.webp" },
    { url: "/banner/bannerforsm3.webp" },
    { url: "/banner/bannerforsm4.webp" },
  ];

  return (
    <div>
      <div className="md:block hidden">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectFade, Autoplay]}
        >
          {heroBanner.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="text-color-primary bg-no-repeat bg-cover relative "
                style={{ backgroundImage: `url(${banner.url})` }}
              >
                <div className="md:h-212.5 min-h-[95vh] w-full flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="font-bold leading-[1.05] tracking-tight text-[clamp(2rem,8vw,6rem)] text-gradient"
                    >
                      {t("hero_title")}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className=" my-2 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
                    >
                      {t("hero_subtitle")}
                    </motion.p>

                    <div className=" flex gap-2 sm:gap-4">
                      <LinkButton
                        path={"/events"}
                        title={"hero_cta_donation"}
                        isArrow={true}
                      />
                      <LinkButton
                        path={"/history"}
                        title={"hero_cta_history"}
                        isArrow={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* for sm */}
      <div className="md:hidden block">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectFade, Autoplay]}
        >
          {heroBannerforsm.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="text-color-primary bg-no-repeat bg-center bg-cover relative"
                style={{ backgroundImage: `url(${banner.url})` }}
              >
                <div className="md:h-212.5 min-h-[95vh] w-full flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="font-bold leading-[1.05] tracking-tight text-[clamp(3rem,8vw,6rem)] text-gradient"
                    >
                      {t("hero_title")}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className="mt-3 max-w-xl text-base md:text-lg text-white/80 leading-relaxed"
                    >
                      {t("hero_subtitle")}
                    </motion.p>

                    <div className=" flex gap-2 sm:gap-4">
                      <LinkButton
                        path={"/events"}
                        title={"hero_cta_donation"}
                        isArrow={true}
                      />
                      <LinkButton
                        path={"/history"}
                        title={"hero_cta_history"}
                        isArrow={true}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
