import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SITEWEB from "./pages/SITEWEB";
import PageExperienceN32 from "./pages/PageExperienceN32";
import PageExperienceN3 from "./pages/PageExperienceN3";
import PageExperienceN11 from "./pages/PageExperienceN11";
import PageAPEExperience22 from "./pages/PageAPEExperience22";
import PageAPEExperience21 from "./pages/PageAPEExperience21";
import PageToutesLesExperiences from "./pages/PageToutesLesExperiences";
import PageExperienceN1 from "./pages/PageExperienceN1";
import PageLevel from "./pages/PageLevel";
import LaunchAppHOME from "./pages/LaunchAppHOME";
import WalletAbstraction from "./WalletAbstraction";

const App = () => {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SITEWEB />} />
        <Route path="/walletAbstraction" element={<WalletAbstraction />} />
        <Route path="/page-experience-n3" element={<PageExperienceN3 />} />
        <Route path="/page-experience-n1-1" element={<PageExperienceN11 />} />
        <Route path="/page-ape-experience-22" element={<PageAPEExperience22 />} />
        <Route path="/page-ape-experience-21" element={<PageAPEExperience21 />} />
        <Route path="/page-toutes-les-experiences" element={<PageToutesLesExperiences />} />
        <Route path="/page-experience-n1" element={<PageExperienceN1 />} />
        <Route path="/page-level" element={<PageLevel />} />
        <Route path="/launch-app-home" element={<LaunchAppHOME />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;