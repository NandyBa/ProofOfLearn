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
      <Route path="/launchapp" element={<LaunchAppHOME />} />
      <Route path="/levels" element={<PageLevel />} />
      <Route path="/experiences" element={<PageToutesLesExperiences />} />
      <Route path="/1inch-start" element={<PageExperienceN3 />} />
      <Route path="/1inch-experience" element={<PageExperienceN32 />} />
      <Route path="/nouns-start" element={<PageExperienceN1 />} />
      <Route path="/nouns-experience" element={<PageExperienceN11 />} />
      <Route path="/ape-start" element={<PageAPEExperience21 />} />
      <Route path="/ape-experience" element={<PageAPEExperience22 />} />
      <Route path="/ape-quizz" element={<ApeQuizz />} />
    </Routes>
  );
}
export default App;
