import "./home.css";
// import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import FeaturedHotels from "../../components/fearuredHotels/FeaturedHotels";
import FavProperties from "../../components/favProperties/FavProperties";
import Subscription from "../../components/subscription/Subscription";
// import ListYourProp from "../../components/listYourProp/ListYourProp";
// import LinksList from "../../components/linksList/LinksList";
// import Footer from "../../components/footer/Footer";
import Cities from "../../components/cities/Cities";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Cities />
        <FeaturedHotels />
        <FavProperties />
        <Subscription />
        {/* <ListYourProp /> */}
        {/* <LinksList /> */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Home;
