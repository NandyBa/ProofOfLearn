import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import PageExperienceN32 from "./pages/PageExperienceN32";
import PageExperienceN3 from "./pages/PageExperienceN3";
import PageExperienceN11 from "./pages/PageExperienceN11";
import PageAPEExperience22 from "./pages/PageAPEExperience22";
import PageAPEExperience21 from "./pages/PageAPEExperience21";
import PageToutesLesExperiences from "./pages/PageToutesLesExperiences";
import PageExperienceN1 from "./pages/PageExperienceN1";
import PageLevel from "./pages/PageLevel";
import HomePage from "./pages/HomePage";
import LaunchAppHOME from "./pages/LaunchAppHOME";
import ApeQuizz from "./pages/ApeQuizz";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/page-experience-n32" element={<PageExperienceN32 />} />
      <Route path="/page-experience-n3" element={<PageExperienceN3 />} />
      <Route path="/page-experience-n1-1" element={<PageExperienceN11 />} />
      <Route path="/page-ape-experience-22" element={<PageAPEExperience22 />} />
      <Route path="/page-ape-experience-21" element={<PageAPEExperience21 />} />
      <Route path="/page-ape-experience-quizz" element={<ApeQuizz />} />
      <Route path="/page-toutes-les-experiences" element={<PageToutesLesExperiences />} />
      <Route path="/page-experience-n1" element={<PageExperienceN1 />} />
      <Route path="/page-level" element={<PageLevel />} />
      <Route path="/launch-app-home" element={<LaunchAppHOME />} />
    </Routes>
  );
}
export default App;
