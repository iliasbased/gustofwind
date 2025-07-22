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
import GMPlayers from "./pages/gmplayers";
import GMPlayer from "./pages/gmplayer";
import Settings from "./pages/settings";
import Shop from "./pages/shop";
import { GamemasterProvider } from "./context/gmContext";
import { HeroProvider } from "./context/heroContext";
import GMLayout from "./layouts/gmLayout";
import HeroLayout from "./layouts/heroLayout";

export default function GustOfWind() {
  return (
    <div className="fixed-app">
      <GamemasterProvider>
        <HeroProvider>
          <GHeader />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/choice" element={<Choice />} />

            <Route path="/gamemaster" element={<GameMaster />} />
            <Route element={<GMLayout />}>
              <Route path="/gmplayers" element={<GMPlayers />} />
              <Route path="/gmplayer" element={<GMPlayer />} />
            </Route>

            <Route path="/hero" element={<HeroSelection />} />
            <Route element={<HeroLayout />}>
              <Route path="/character" element={<Character />} />
              <Route path="/tavern" element={<Tavern />} />
              <Route path="/questlog" element={<QuestLog />} />
              <Route path="/combat" element={<Combat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/shop" element={<Shop />} />
            </Route>

            <Route element={<AuthOutlet fallbackPath="/" />}></Route>
          </Routes>
        </HeroProvider>
      </GamemasterProvider>
      <GFooter />
    </div>
  );
}
