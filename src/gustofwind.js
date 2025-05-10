import "./assets/gustofwind.css";
import "./style/animations.css";
import { Route, Routes } from "react-router-dom";
import AuthOutlet from "react-auth-kit";
import SHeader from "./components/header";
import SCentered from "./layouts/centered";
import Intro from "./pages/intro";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import Player from "./pages/player";
import GameMaster from "./pages/gamemaster";
import Choice from "./pages/choice";
import GFooter from "./components/footer";

export default function GustOfWind() {
  return (
    <>
      <SHeader />
      <SCentered>
        <Routes>
          <Route path="/" element={<Intro />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/player" element={<Player />}/>
          <Route element={<AuthOutlet fallbackPath='/' />}>
            <Route path="/choice" element={<Choice />} />
            <Route path="/player" element={<Player />}/>
            <Route path="/gamemaster" element={<GameMaster />} />
          </Route>
        </Routes>
      </SCentered>
      <GFooter />
    </>
  );
}
