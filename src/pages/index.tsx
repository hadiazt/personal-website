import { Footer } from "../components/Footer";
import { Banner } from "../components/HomeComponents/Banner";
import { GitOrgs } from "../components/HomeComponents/Git/GitOrgs";
import { GitRepos } from "../components/HomeComponents/Git/GitRepos";

export default () => {
  return (
    <div className="Home-Page -z-10" dir="rtl">
      <div className="rounded-3xl overflow-hidden">
        <Banner />
        <GitRepos />
        <GitOrgs />
        <Footer />
      </div>
    </div>
  );
};
