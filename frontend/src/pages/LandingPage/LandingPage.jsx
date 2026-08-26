
import Hero from "../../components/Hero/Hero";
import Home from "../Home/Home";
import Portfolio from "../Portfolio/Portfolio";
import Blog from "../Blog/Blog";
import Contacts from "../Contacts/Contacts";

const LandingPage = () => {
  return (
    <main>
      <Hero />
      <Home />
      <Portfolio />
      <Blog />
      <Contacts />
    </main>
  );
};

export default LandingPage;