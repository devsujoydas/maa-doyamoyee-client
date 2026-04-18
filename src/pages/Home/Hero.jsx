import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  // ✅ Replace these with REAL Cloudinary URLs later
  const heroBanner = [
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1600/banner1.webp",
    // },
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1600/banner2.webp",
    // },
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1600/banner3.webp",
    // },
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1600/banner4.webp",
    // },
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_1600/banner5.webp",
    // },
    { url: "/banner/banner1.webp" },
    { url: "/banner/newbanner1.webp" },
    { url: "/banner/newbanner2.webp" },
    { url: "/banner/newbanner3.webp" },
    { url: "/banner/newbanner4.webp" },
    { url: "/banner/newbanner5.webp" },
    { url: "/banner/newbanner6.webp" },
  ];

  const heroBannerMobile = [
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_900/mobile1.webp",
    // },
    // {
    //   url: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/f_auto,q_auto,w_900/mobile2.webp",
    // },
    {
      url: "https://res.cloudinary.com/dpdsgroa7/image/upload/f_auto,q_auto,w_1600/v1773583586/image38_p0mylr.webp",
    },
    { url: "/banner/bannerforsm2.webp" },
    { url: "/banner/bannerforsm3.webp" },
    { url: "/banner/bannerforsm4.webp" },
  ];

  const OverlayContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-bold tracking-tight text-[clamp(2rem,8vw,6rem)] text-gradient"
      >
        {t("hero_title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 max-w-xl text-base md:text-lg text-white/80"
      >
        {t("hero_subtitle")}
      </motion.p>

      <div className="flex gap-3 sm:gap-4 mt-5">
        <Link to="/history" className="btn-primary">
          {t("hero_cta_history")}
        </Link>

        <Link to="/puja-schedule" className="btn-primary">
          {t("nav_puja_schedule")}
        </Link>
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {heroBanner.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full min-h-[95vh]">
                {/* ✅ LCP optimized image */}
                <img
                  src={banner.url}
                  alt="hero-banner"
                  className="w-full h-[95vh] object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "auto"}
                />

                <OverlayContent />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {heroBannerMobile.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full min-h-[95vh]">
                <img
                  src={banner.url}
                  alt="hero-banner-mobile"
                  className="w-full h-[95vh] object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchpriority={index === 0 ? "high" : "auto"}
                />

                <OverlayContent />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
