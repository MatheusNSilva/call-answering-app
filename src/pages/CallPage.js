import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Toolbar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CallDetail from "../components/CallDetail";
import "../styles/CallPage.css";

const CallPage = () => {
  // const calls = useSelector((state) => state.call.calls);
  const { name, maxCalls } = useSelector((state) => state.user);
  const [selectedCall, setSelectedCall] = useState(null);
  const navigate = useNavigate();

  const calls = [
    {
      callId: "12345",
      caller: "Teste2",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12346",
      caller: "Teste3",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12347",
      caller: "Teste4",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12348",
      caller: "Teste5",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12350",
      caller: "Teste6",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12351",
      caller: "Teste7",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12352",
      caller: "Teste8",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12353",
      caller: "Teste9",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
    {
      callId: "12354",
      caller: "Teste1",
      service: "Ativa",
      media: "Chat",
      startDate: Date("04/12/2024"),
    },
  ];

  const handleSelectedCall = (call) => {
    setSelectedCall(call);
  };

  const handleEndCall = () => {
    setSelectedCall(null);
  };

  const handleDisconnect = () => {
    navigate("/");
  };  

  return (
    <Container className={"call-page"}>
      <AppBar className={"call-page-nav"} component={"nav"}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Controle de Chamados
          </Typography>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="h6" component="div">
            {maxCalls} Chamados
          </Typography>
          <Button variant="contained" onClick={handleDisconnect}>
            Desconectar
          </Button>
        </Toolbar>
      </AppBar>
      <Box component={"main"} className={"call-page-main"}>
        {calls.length > 0 ? (
            <List className={"call-page-list"}>
              {calls.map((callItem) => (
                <ListItem button onClick={() => handleSelectedCall(callItem)} key={callItem.callId}>
                  <ListItemButton>
                    <ListItemText primary={callItem.caller} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <CircularProgress />
            <Typography variant={"h6"} ml={2}>
              Aguardando chamadas...
            </Typography>
          </Box>
        )}
        <Box className={"call-page-box"}>
          <CallDetail call={selectedCall} onEndCall={handleEndCall} />
        </Box>
      </Box>
    </Container>
  );
};

export default CallPage;
