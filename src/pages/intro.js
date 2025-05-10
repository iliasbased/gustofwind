import { useState } from "react";
import SLogo from "../components/logo";
import SFadeInOut from "../layouts/fade-in-out";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <SFadeInOut
        onFadeInEnd={() => {
          setFadeOut(true);
        }}
        onFadeOutEnd={() => {
          sessionStorage.setItem("loggedIn", true);
          navigate('/player')
        }}
        fadeOut={fadeOut}
      >
        Gust of Wind
        {/* <SLogo className="intro-logo" /> */}
      </SFadeInOut>
    </>
  );
}
