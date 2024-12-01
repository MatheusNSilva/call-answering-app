import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCall, leaveCall } from "../store/callSlice";
import { connectUser, disconnectUser } from "../store/userSlice";
import socket from "../services/socket";

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on("USER_CONNECT", (data) => {
      console.log("Conectado ao servidor WebSocket:", data);
      dispatch(connectUser({ name: data.username, maxChats: data.maxCalls }));
    });

    socket.on("USER_CONNECTION_ERROR", (error) => {
      console.error("Erro na conexão do usuário:", error);
    });

    socket.on("USER_DISCONNECTED", (data) => {
      console.log("Usuário desconectado:", data);
      dispatch(disconnectUser());
    });

    socket.on("USER_DISCONNECTION_ERROR", (error) => {
      console.error("Erro na desconexão do usuário:", error);
    });

    // Listener para novas chamadas
    socket.on("NEW_CALL", (call) => {
      console.log("Nova chamada recebida:", call);
      dispatch(addCall(call));
    });

    socket.on("CALL_ENDED", (data) => {
      console.log("Chamada encerrada:", data);
      dispatch(leaveCall(data.callId)); // Remove a chamada do estado global
    });

    socket.on("END_CALL_ERROR", (error) => {
      console.error("Erro ao encerrar a chamada:", error);
    });

    // Cleanup ao desmontar
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
    socket.emit("USER_CONNECT", { username: username, maxCalls: maxCalls });
  };

  const disconnect = (username) => {
    socket.emit("USER_DISCONNECT", { username });
  };

  const answerCall = (callId) => {
    socket.emit("NEW_CALL_ANSWERED", { callId });
  };

  const endCall = (callId) => {
    socket.emit("END_CALL", { callId });
  };

  return { connect, disconnect, answerCall, endCall };
};

export default useSocket;
