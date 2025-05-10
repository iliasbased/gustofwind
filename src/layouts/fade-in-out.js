import { useRef, useEffect } from "react";

export default function SFadeInOut({ onFadeInEnd, onFadeOutEnd, fadeOut, children }) {
  const animatedDivRef = useRef(null);

  useEffect(() => {
    animatedDivRef.current.addEventListener("animationend", onFadeInEnd);

    if (fadeOut) {
      animatedDivRef.current.removeEventListener("animationend", onFadeInEnd);
      animatedDivRef.current.addEventListener("animationend", onFadeOutEnd);
    }
  }, [fadeOut]);

  return (
    <>
      <div
        ref={animatedDivRef}
        className={fadeOut ? "fade-out" : "fade-in"}
      >
        {children}
      </div>
    </>
  );
}
