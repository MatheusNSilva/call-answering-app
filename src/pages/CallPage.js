import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { leaveCall } from "../store/callSlice";

const CallPage = () => {
  const conversations = useSelector((state) => state.chat.conversations);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const dispatch = useDispatch();

  const handleEndChat = (id) => {
    dispatch(leaveCall(id));
  };

  return (
    <div>
      <h1>Conversa</h1>
      <ul>
        {conversations.map((chat) => (
          <li key={chat.id}>
            <button onClick={() => handleEndChat(chat.id)}>Encerrar</button>
          </li>
        ))}
      </ul>
      {activeChatId && <div>Conteúdo da conversa {activeChatId}</div>}
    </div>
  );
};

export default CallPage;
