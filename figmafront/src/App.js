import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import PageAPEExperience from "./pages/PageAPEExperience";
import PageAPEExperience1 from "./pages/PageAPEExperience1";
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
      case "/page-ape-experience":
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
      <Route path="/" element={<PageAPEExperience />} />
      <Route path="/page-ape-experience" element={<PageAPEExperience1 />} />
    </Routes>
  );
}
export default App;
