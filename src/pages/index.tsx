import { Footer } from "../components/Footer";
import { Banner } from "../components/HomeComponents/Banner";
import { GitOrgs } from "../components/HomeComponents/Git/GitOrgs";
import { GitRepos } from "../components/HomeComponents/Git/GitRepos";
import { MyExpertise } from "../components/HomeComponents/Expertise/MyExpertise";

export default () => {
  return (
    <div className="Home-Page -z-10 " dir="rtl">
      <div className="rounded-3xl overflow-hidden">
        <Banner />
        <MyExpertise />
        <GitRepos />
        <GitOrgs />
        <Footer />
      </div>
    </div>
  );
};
