import Footer from "../components/Footer";
import Banner from "../components/HomeComponents/Banner";
import MyExpertise from "../components/HomeComponents/Expertise/MyExpertise";
import Recommendations from "../components/HomeComponents/Recommendations/Recommendations";
import ClientReviews from "../components/HomeComponents/ClientReviews/ClientReviews";

export default () => {
  return (
    <div className="Home-Page -z-10" dir="rtl">
      <Banner />
      <MyExpertise />
      <Recommendations />
      <ClientReviews />
      <Footer />
    </div>
  );
};
