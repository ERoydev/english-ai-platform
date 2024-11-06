// Components
import Footer from "./components/common/Footer/Footer";
import Home from "./components/common/Home/Home";
import Navigation from "./components/common/Navigation/Navigation";
import PracticeApp from "./components/common/PracticeApp/PracticeApp.tsx";
import AuthScreen from "./components/common/Authentication/AuthScreen.tsx";

// React Router
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Mapping Files
import Path from "./Paths.tsx";
import Courses from "./components/common/Courses/Courses.tsx";
import Logout from "./components/common/Authentication/Logout.tsx";

// 
import UserLoader from "./components/common/Authentication/UserLoader.tsx";
import AuthGuard from "./components/guards/AuthGuard.tsx";
import IELTS from "./components/common/PracticeApp/IELTS/IELTS.tsx";
import IeltsSpeaking from "./components/common/PracticeApp/IELTS/IeltsSpeaking/IeltsSpeaking.tsx";
import SpeechAnalysis from "./components/functionalComponents/SpeechAnalysis/SpeechAnalysis.tsx";


export default function App() {
  const location = useLocation();

  // Helper function to determine if Footer should be shown
  const shouldShowFooter = () => {
    const noFooterPaths = [
      Path.PracticeApp,
      Path.Signup,
      Path.Login,
      Path.IeltsSpeaking,
      Path.SpeechAnalysis,
    ];
    return !noFooterPaths.includes(location.pathname);
  };

  const isPracticeApp = [
    Path.PracticeApp,
    Path.Signup,
    Path.Login,
    Path.IeltsSpeaking,
  ].includes(location.pathname);

  return (
    <main>
      <UserLoader> 
        {!isPracticeApp && <Navigation />}
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.PracticeApp} element={<AuthGuard><PracticeApp/></AuthGuard>} />
          <Route path={Path.IELTS} element={<IELTS />} />
          <Route path={Path.IeltsSpeaking} element={<IeltsSpeaking />} />
          <Route path={Path.SpeechAnalysis} element={<SpeechAnalysis />} />
          <Route path={Path.Courses} element={<Courses />} />
          <Route path={Path.Signup} element={<AuthScreen authActionName="Sign up"/>} />
          <Route path={Path.Login} element={<AuthScreen authActionName="Login"/>} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
        {shouldShowFooter() && <Footer />}
      </UserLoader>
    </main>
  );
}