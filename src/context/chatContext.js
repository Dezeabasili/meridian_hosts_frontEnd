import { createContext, useContext, useState, useRef } from "react";

const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
 
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState();
  const [chat_id, setChat_id] = useState();
  const previousChat_id = useRef();

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        chatName, 
        setChatName,
        chat_id, 
        setChat_id,
        previousChat_id,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
