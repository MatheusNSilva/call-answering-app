import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { connectUser } from "../store/userSlice";
import { integersInputValidation } from "../utils/integersInputHelper";
import { Button, OutlinedInput } from "@mui/material";
import FormBox from "../components/FormBox";
import "../styles/HomePage.css";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [maxChats, setMaxChats] = useState();
  const dispatch = useDispatch();

  const handleConnect = () => {
    console.log("username", username);
    console.log("maxChats", maxChats);
    dispatch(connectUser({ name: username, maxChats }));
  };

  const handleMaxChatsInput = (e) => {
    const inputValidated = integersInputValidation(e.target.value);
    setMaxChats(inputValidated);
  };

  return (
    <div className={"home-page"}>
      <h1>Bem-vindo</h1>
      <FormBox
        fields={
          <>
            <OutlinedInput
              name={"username"}
              className={"inputs-page"}
              placeholder="Seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <OutlinedInput
              name={"max-chats"}
              placeholder="Máximo de chats"
              value={maxChats}
              onChange={(e) => handleMaxChatsInput(e)}
            />
          </>
        }
        actions={
          <Button variant={"contained"} size={"small"} onClick={handleConnect}>
            Conectar
          </Button>
        }
      />
    </div>
  );
};

export default HomePage;
