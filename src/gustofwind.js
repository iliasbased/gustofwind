import "./assets/gustofwind.css";
import "./style/animations.css";
import { Route, Routes } from "react-router-dom";
import AuthOutlet from "react-auth-kit";
import GHeader from "./components/header";
import SCentered from "./layouts/centered";
import Intro from "./pages/intro";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import GameMaster from "./pages/gamemaster";
import Choice from "./pages/choice";
import GFooter from "./components/footer";
import Combat from "./pages/combat";
import Tavern from "./pages/tavern";
import QuestLog from "./pages/questlog";
import Character from "./pages/character";
import HeroSelection from "./pages/hero";

export default function GustOfWind() {
  return (
    <div className="fixed-app">
      <GHeader />
      <Routes>
        <Route path="/" element={<Intro />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/choice" element={<Choice />} />
        <Route path="/hero" element={<HeroSelection />} />
        <Route path="/character" element={<Character />} />
        <Route path="/gamemaster" element={<GameMaster />} />
        <Route path="/tavern" element={<Tavern />} />
        <Route path="/questlog" element={<QuestLog />} />
        <Route path="/combat" element={<Combat />} />
        <Route element={<AuthOutlet fallbackPath="/" />}></Route>
      </Routes>
      <GFooter />
    </div>
  );
}
