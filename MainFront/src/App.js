import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PageExperienceN32 from "./pages/PageExperienceN32";
import PageExperienceN3 from "./pages/PageExperienceN3";
import PageExperienceN11 from "./pages/PageExperienceN11";
import PageAPEExperience22 from "./pages/PageAPEExperience22";
import PageAPEExperience21 from "./pages/PageAPEExperience21";
import PageToutesLesExperiences from "./pages/PageToutesLesExperiences";
import PageExperienceN1 from "./pages/PageExperienceN1";
import PageLevel from "./pages/PageLevel";
import SITEWEB from "./pages/SITEWEB";
import LaunchAppHOME from "./pages/LaunchAppHOME";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/page-experience-n3":
        title = "";
        metaDescription = "";
        break;
      case "/page-experience-n1-1":
        title = "";
        metaDescription = "";
        break;
      case "/page-ape-experience-22":
        title = "";
        metaDescription = "";
        break;
      case "/page-ape-experience-21":
        title = "";
        metaDescription = "";
        break;
      case "/page-toutes-les-experiences":
        title = "";
        metaDescription = "";
        break;
      case "/page-experience-n1":
        title = "";
        metaDescription = "";
        break;
      case "/page-level":
        title = "";
        metaDescription = "";
        break;
      case "/site-web":
        title = "";
        metaDescription = "";
        break;
      case "/launch-app-home":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<PageExperienceN32 />} />
      <Route path="/page-experience-n3" element={<PageExperienceN3 />} />
      <Route path="/page-experience-n1-1" element={<PageExperienceN11 />} />
      <Route path="/page-ape-experience-22" element={<PageAPEExperience22 />} />
      <Route path="/page-ape-experience-21" element={<PageAPEExperience21 />} />
      <Route
        path="/page-toutes-les-experiences"
        element={<PageToutesLesExperiences />}
      />
      <Route path="/page-experience-n1" element={<PageExperienceN1 />} />
      <Route path="/page-level" element={<PageLevel />} />
      <Route path="/site-web" element={<SITEWEB />} />
      <Route path="/launch-app-home" element={<LaunchAppHOME />} />
    </Routes>
  );
}
export default App;
