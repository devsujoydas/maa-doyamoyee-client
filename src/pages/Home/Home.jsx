import Hero from "./Hero";
import About from "./About";
import BlogsSection from "./BlogsSection";
import LatestNotice from "./LatestNotice";
import SupporttheTemple from "./SupporttheTemple";
import UpcommingEvents from "./UpcommingEvents";

const Home = () => {
  return (
    <div className="">
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
