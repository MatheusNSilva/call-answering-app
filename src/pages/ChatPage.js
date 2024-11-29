import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveChat, endChat } from "../store/chatSlice";

const ChatPage = () => {
  const conversations = useSelector((state) => state.chat.conversations);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const dispatch = useDispatch();

  const handleSelectChat = (id) => {
    dispatch(setActiveChat(id));
  };

  const handleEndChat = (id) => {
    dispatch(endChat(id));
  };

  return (
    <div>
      <h1>Conversa</h1>
      <ul>
        {conversations.map((chat) => (
          <li key={chat.id}>
            <span onClick={() => handleSelectChat(chat.id)}>{chat.name}</span>
            <button onClick={() => handleEndChat(chat.id)}>Encerrar</button>
          </li>
        ))}
      </ul>
      {activeChatId && <div>Conteúdo da conversa {activeChatId}</div>}
    </div>
  );
};

export default ChatPage;
