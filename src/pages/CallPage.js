import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "@mui/material";
import useSocket from "../hooks/useSocket";
import CallDetail from "../components/CallDetail";
import CallList from "../components/CallList";
import CallPageHeader from "../components/CallPageHeader";
import "../styles/CallPage.css";
import { clearUserError, disconnectUser } from "../store/userSlice";
import { clearCallError } from "../store/callSlice";
import ErrorAlert from "../components/ErrorAlert";

const CallPage = () => {
  const callError = useSelector((state) => state.call.error);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { name, maxCalls } = useSelector((state) => state.user);
  const [selectedCall, setSelectedCall] = useState(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const { disconnect, endCall } = useSocket();

  const callsMock = [
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
    if (callError) {
      console.error(callError || "Erro detectado ao encerrar chamado");
    }
  }, [callError]);

  useEffect(() => {
    if (!user.connected) {
      navigate("/");
    }
    if (user.error) {
      console.error("Erro ao desconectar detectado:", user.error);
      setIsDisconnecting(false);
    }
  }, [user.connected, user.error, navigate]);

  return (
    <Container className={"call-page"}>
      <CallPageHeader userInfo={{ name, maxCalls }} action={handleDisconnect} />
      <Box component={"main"} className={"call-page-main"}>
        {callsMock.length > 0 ? (
          <>
            <CallList calls={callsMock} action={handleSelectedCall} />
            <Box className={"call-page-box"}>
              <Typography className={"call-page-box-title"} variant="h6">
                Operador {name} com {maxCalls} chamados em atendimento
              </Typography>
              <ErrorAlert label={user.error} onClose={() => dispatch(clearUserError())} />
              <ErrorAlert label={callError} onClose={() => dispatch(clearCallError())} />
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
          <Button
            variant={"contained"}
            onClick={cancelDisconnect}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            variant={"contained"}
            onClick={confirmDisconnect}
            color="error"
            autoFocus
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CallPage;
