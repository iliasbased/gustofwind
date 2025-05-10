import { useEffect, useState } from "react";
import Character from "./character";

export default function Player() {
  useEffect(() => {
    /* fetch("http://localhost/index.php/account/getAllAccounts").then(async (response) => {
      let responseJson = await response.json();
      setMyName(responseJson.accounts[0].name);
    }); */
  }, []);

  return (
    <>
      <Character />
    </>
  );
}
