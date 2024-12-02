import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCallError, addCall, leaveCall, setLeaveCallError } from "../store/callSlice";
import { clearUserError, disconnectUser, setConnectionError, setDisconnectionError } from "../store/userSlice";
import { validateCall } from "../utils/validateCall";
import socket from "../services/socket";

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on("USER_CONNECT", (data) => {
      console.log("Conectado ao servidor WebSocket:", data);
    });

    socket.on("USER_CONNECTION_ERROR", (error) => {
      console.error("Erro na conexão do usuário:", error);
      dispatch(setConnectionError(error));
    });

    socket.on("USER_DISCONNECTED", (data) => {
      console.log("Usuário desconectado:", data);
      dispatch(disconnectUser());
      dispatch(clearUserError());
      dispatch(clearCallError());
    });

    socket.on("USER_DISCONNECTION_ERROR", (error) => {
      console.error("Erro na desconexão do usuário:", error);
      dispatch(setDisconnectionError(error));
    });

    socket.on("NEW_CALL", (call) => {
      console.log("Novo chamado recebido:", call);

      try {
        const isCallValid = validateCall(call);

        if (isCallValid) {
          dispatch(addCall(call));
          answerCall(call.callId);
          console.log("Chamado aceito:", call.callId);
        } else {
          throw new Error("Chamada inválida ou rejeitada.");
        }
      } catch (error) {
        console.error("Erro ao processar chamada:", error.message);
        answerCallError(call.callId, error.message);
      }
    });

    socket.on("CALL_ENDED", (data) => {
      console.log("Chamada encerrada:", data);
      dispatch(leaveCall(data.callId)); 
    });

    socket.on("END_CALL_ERROR", (error) => {
      console.error("Erro ao encerrar a chamada:", error);
      dispatch(setLeaveCallError(error));
    });

    return () => {
      socket.disconnect();
      socket.off("USER_CONNECTED");
      socket.off("USER_CONNECTION_ERROR");
      socket.off("USER_DISCONNECTED");
      socket.off("USER_DISCONNECTION_ERROR");
      socket.off("NEW_CALL");
      socket.off("CALL_ENDED");
      socket.off("END_CALL_ERROR");
    };
  }, [dispatch]);

  const connect = (username, maxCalls) => {
    console.log("connect", username, maxCalls);
    socket.emit("USER_CONNECT", { username: username, maxCalls: maxCalls });
  };

  const disconnect = (username) => {
    console.log("disconnect", username);
    socket.emit("USER_DISCONNECT", { username });
  };

  const answerCall = (callId) => {
    socket.emit("NEW_CALL_ANSWERED", { callId });
  };

  const answerCallError = (callId, error) => {
    socket.emit("NEW_CALL_ERROR", { callId: callId, error: error });
  };

  const endCall = (callId) => {
    socket.emit("END_CALL", { callId });
  };

  return { connect, disconnect, answerCall, answerCallError, endCall };
};

export default useSocket;
