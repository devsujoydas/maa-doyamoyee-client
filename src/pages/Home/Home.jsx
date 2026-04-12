import Hero from "./Hero";
import About from "./About";
import BlogsSection from "./BlogsSection";
import LatestNotice from "./LatestNotice";
import SupporttheTemple from "./SupporttheTemple";
import UpcommingEvents from "./UpcommingEvents";
import SEO from "../../components/SEO";

const Home = () => {
  return (
    <div className="">
      <SEO
        title="Maa Doyamoyee Temple | Shri Shri Ri Doyamoyee Temple Jamalpur"
        description="Welcome to Maa Doyamoyee Temple, Jamalpur Bangladesh. Explore temple history, puja events, donations, blogs and community activities. শ্রী শ্রীঁ রী দয়াময়ী মন্দির সম্পর্কে জানুন।"
        url="https://maa-doyamoyee.vercel.app/"
        keywords="Maa Doyamoyee Temple, Jamalpur temple, Bangladesh Hindu temple, Shri Shri Ri Doyamoyee Temple, Maa Doyamoyee, মন্দির, হিন্দু মন্দির বাংলাদেশ"
      />
      <Hero />
      <About />
      <LatestNotice />
      <UpcommingEvents />
      <BlogsSection />
      <SupporttheTemple />
    </div>
  );
};

export default Home;
