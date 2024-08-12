// Components
import Footer from "./components/common/Footer/Footer";
import Home from "./components/common/Home/Home";
import Navigation from "./components/common/Navigation/Navigation";
import PracticeApp from "./components/common/PracticeApp/PracticeApp.tsx";

// React Router
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Mapping Files
import Path from "./Paths.tsx";


export default function App() {
  const location = useLocation();

  // I use this to disable nav and footer in PracticeApp !
  const isPracticeApp = location.pathname == Path.PracticeApp;


  return (
    <main>
      {!isPracticeApp && <Navigation />}
        <Routes >
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.PracticeApp} element={<PracticeApp />} />
        </Routes>
      {!isPracticeApp && <Footer />}
    </main>
  )
}