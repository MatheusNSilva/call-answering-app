import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addConversation } from '../store/chatSlice';
import socket from '../services/socket';

const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Conectar ao servidor
    socket.connect();

    // Listener para novas chamadas
    socket.on('newCall', (data) => {
      dispatch(addConversation(data));
    });

    // Cleanup ao desmontar
    return () => {
      socket.disconnect();
      socket.off('newCall');
    };
  }, [dispatch]);
};

export default useSocket;
