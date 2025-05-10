import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import SButton from "../components/button";
import SFadeInOut from "../layouts/fade-in-out";

export default function Choice() {
  const [nextPage, setNextPage] = useState("");
  const navigate = useNavigate();

  return (
    <SFadeInOut
      onFadeOutEnd={() => {
        navigate(nextPage);
      }}
      fadeOut={nextPage != ""}
    >
      <Stack direction="horizontal" gap={5}>
        <SButton
          size="large"
          onClick={() => {
            sessionStorage.setItem("choice", "consumer");
            setNextPage("/consumer");
          }}
        >
          i'm hungry
        </SButton>
        <SButton
          size="large"
          onClick={() => {
            sessionStorage.setItem("choice", "vendor");
            setNextPage("/vendorchoice");
          }}
        >
          i've got food
        </SButton>
      </Stack>
    </SFadeInOut>
  );
}
