import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { leaveCall } from "../store/callSlice";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Backdrop,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Button,
} from "@mui/material";
import useSocket from "../hooks/useSocket";
import CallDetail from "../components/CallDetail";
import CallList from "../components/CallList";
import CallPageHeader from "../components/CallPageHeader";
import "../styles/CallPage.css";
import { disconnectUser } from "../store/userSlice";

const CallPage = () => {
  // const calls = useSelector((state) => state.call.calls);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { name, maxCalls } = useSelector((state) => state.user);
  const [selectedCall, setSelectedCall] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const { disconnect, endCall } = useSocket();

  // console.log("calls", calls);

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

  const handleEndCall = (callId) => {
    setSelectedCall(null);
    endCall(callId);
    leaveCall(callId);
  };

  const handleDisconnect = () => {
    setIsDisconnecting(true);
    disconnect(name);

    setTimeout(() => {
      setIsDisconnecting((prevIsDisconnecting) => {
      if (prevIsDisconnecting) {
        setShowDialog(true);
      }
      return false;
    });
    }, 5000);
  };

  const confirmDisconnect = () => {
    setShowDialog(false);
    dispatch(disconnectUser());
  };

  const cancelDisconnect = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    if (!user.connected) {
      navigate("/");
    }
    if (user.error) {
      console.error("Erro ao desconectar detectado:", user.error);
      setUserError(user.error || "Erro ao desconectar do servidor");
      setIsDisconnecting(false);
    }
  }, [user.connected, user.error, navigate]);

  return (
    <Container className={"call-page"}>
      <CallPageHeader userInfo={{ name, maxCalls }} action={handleDisconnect} />

      {userError && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {userError}
        </Alert>
      )}

      <Box component={"main"} className={"call-page-main"}>
        {calls.length > 0 ? (
          <>
            <CallList calls={calls} action={handleSelectedCall} />
            <Box className={"call-page-box"}>
              <Typography className={"call-page-box-title"} variant="h6">
                Operador {name} com {maxCalls} chamados em atendimento
              </Typography>
              <CallDetail call={selectedCall} onEndCall={handleEndCall} />
            </Box>
          </>
        ) : (
          <Box className={"call-page-loading"}>
            <CircularProgress />
            <Typography variant={"h6"} ml={2}>
              Aguardando chamados...
            </Typography>
          </Box>
        )}
      </Box>

      <Backdrop open={isDisconnecting} sx={{ zIndex: 9999, color: "#fff" }}>
        <Box textAlign="center">
          <CircularProgress color="inherit" />
          <Typography variant="h6" mt={2}>
            Desconectando, por favor aguarde...
          </Typography>
        </Box>
      </Backdrop>

      <Dialog open={showDialog} onClose={cancelDisconnect}>
        <DialogTitle>Desconexão do Servidor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            O servidor ainda não respondeu. Deseja continuar e sair da tela
            mesmo assim?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} onClick={cancelDisconnect} color="primary">
            Cancelar
          </Button>
          <Button variant={"contained"} onClick={confirmDisconnect} color="error" autoFocus>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CallPage;
