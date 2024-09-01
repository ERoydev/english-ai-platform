// Components
import Footer from "./components/common/Footer/Footer";
import Home from "./components/common/Home/Home";
import Navigation from "./components/common/Navigation/Navigation";
import PracticeApp from "./components/common/PracticeApp/PracticeApp.tsx";
import AuthScreen from "./components/common/Authentication/authScreen.tsx";

// React Router
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Mapping Files
import Path from "./Paths.tsx";
import Courses from "./components/common/Courses/Courses.tsx";
import Logout from "./components/common/Authentication/Logout.tsx";
import { useEffect } from "react";
import { getUserByToken } from "./services/Auth/AuthService.ts";
import { useSelector } from "react-redux";

export default function App() {
  const location = useLocation();

  // I use this to disable nav and footer in PracticeApp !
  const isPracticeApp = location.pathname == Path.PracticeApp || location.pathname == Path.Signup || location.pathname === Path.Login;

  const authToken = useSelector(state => state.auth.userToken)

  useEffect(() => {
    getUserByToken(authToken)
      .then(res => console.log(res))
  }, [])

  return (
    <main>
      {!isPracticeApp && <Navigation />}
        <Routes >
          <Route path={Path.Home} element={<Home />} />
          <Route path={Path.PracticeApp} element={<PracticeApp />} />
          <Route path={Path.Courses} element={<Courses />} />
          <Route path={Path.Signup} element={<AuthScreen authActionName="Sign up"/>} />
          <Route path={Path.Login} element={<AuthScreen authActionName="Login"/>} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>
       {!isPracticeApp && <Footer />}
    </main>
  )
}