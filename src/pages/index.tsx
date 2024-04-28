import { Footer } from "../components/Footer";
import { Banner } from "../components/HomeComponents/Banner";
import { GitRepos } from "../components/HomeComponents/GitRepos";
import { MyExpertise } from "../components/HomeComponents/Expertise/MyExpertise";

export default () => {
  return (
    <div className="Home-Page -z-10 " dir="rtl">
      <div className="rounded-3xl overflow-hidden">
        <Banner />
        <MyExpertise />
        <GitRepos />
        <Footer />
      </div>
    </div>
  );
};
