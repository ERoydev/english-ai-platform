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
import ListItem from "./components/common/shared/EducationContentDisplay/ListItem.tsx";
import Quiz from "./components/common/shared/Quiz/Quiz.tsx";
import ResultPage from "./components/functionalComponents/ResultComponents/ResultPage.tsx";
import AccountSettings from "./components/common/ProfilePage/components/AccountSettings.tsx";
import ProfileSettings from "./components/common/ProfilePage/components/ProfileSettings.tsx";
import PricingPage from "./components/pages/PricingPage.tsx";
import NotFoundPage from "./components/pages/NotFoundPage.tsx";


export default function App() {
  const location = useLocation();

  // Helper function to determine if Footer should be shown
  const shouldShowFooter = () => {
    const noFooterPaths = [
      Path.PracticeApp,
      Path.Signup,
      Path.Login,
      Path.Practice.IeltsSpeaking,
      Path.Practice.SpeechAnalysis,
      Path.Practice.ListItem,
      Path.Practice.Quiz,
      Path.ResultPage,
    ];
    return !noFooterPaths.includes(location.pathname);
  };

  const isPracticeApp = [
    Path.PracticeApp,
    Path.Signup,
    Path.Login,
    Path.Practice.IeltsSpeaking,
    Path.Practice.ListItem,
    Path.Practice.Quiz,
    Path.ResultPage,
    
  ].includes(location.pathname);

  return (
    <main>
      <UserLoader> 
        {!isPracticeApp && <Navigation />}
        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.Pricing} element={<PricingPage />} />

          {/* Practice App Routes */}
          <Route path={Path.PracticeApp} element={<AuthGuard><PracticeApp/></AuthGuard>} />
          <Route path={Path.Practice.IELTS} element={<AuthGuard><IELTS/></AuthGuard>} />
          <Route path={Path.Practice.IeltsSpeaking} element={<AuthGuard><IeltsSpeaking /></AuthGuard>} />
          <Route path={Path.Practice.SpeechAnalysis} element={<AuthGuard><SpeechAnalysis /></AuthGuard>} />
          <Route path={Path.Practice.ListItem} element={<AuthGuard><ListItem /></AuthGuard>} />
          <Route path={Path.Practice.Quiz} element={<AuthGuard><Quiz /></AuthGuard>} />
          <Route path={Path.ResultPage} element={<AuthGuard><ResultPage /></AuthGuard>} />

          {/* Profile */}
          <Route path={Path.Profile.Settings} element={<AuthGuard><AccountSettings /></AuthGuard>} />
          <Route path={Path.Profile.Profile} element={<AuthGuard><ProfileSettings /></AuthGuard>} />
          {/* Add when its time to create course material */}
          {/* <Route path={Path.Courses} element={<Courses />} /> */}

          {/* Auth Routes */}
          <Route path={Path.Signup} element={<AuthScreen authActionName="Sign up"/>} />
          <Route path={Path.Login} element={<AuthScreen authActionName="Login"/>} />
          <Route path={Path.Logout} element={<AuthGuard><Logout /></AuthGuard>} />

          {/* Wildcard Route for 404 Page */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        {shouldShowFooter() && <Footer />}
      </UserLoader>
    </main>
  );
}