import "./messages.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { useSearchContext } from "../../context/searchContext";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { baseURL } from "../../context/authContext";

const Messages = () => {
  const [newMessage, setNewMessage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useRef();
  const prevRoom = useRef();
  const axiosWithInterceptors = useAxiosInterceptors();

  const { messages, setMessages, chatName, chat_id, previousChat_id } =
    useSearchContext();

  useEffect(() => {
    socket.current = io(baseURL);
  }, []);

  useEffect(() => {
    console.log("previousChat_id.current: ", previousChat_id.current);
    console.log("chat_id: ", chat_id);

    let roomObj = {};
    roomObj.newRoom = chat_id;
    roomObj.oldRoom = previousChat_id.current;
    socket.current.emit("join chat room", roomObj);
  }, [chat_id]);

  useEffect(() => {
    socket.current.on("received message", (newMessage) => {
      if (newMessage.chatInfo._id == chat_id) {
        console.log("chat_id: ", chat_id);
        console.log("newMessage.chatInfo._id: ", newMessage.chatInfo._id);
        setMessages((prev) => [...prev, newMessage]);
      }

      // setMessages(prev => [...prev, newMessage])
      // setMessages([...messages, newMessage])
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatMessage = {};
    chatMessage.messageContent = newMessage;
    chatMessage.chatInfo = chat_id;

    try {
      const res = await axiosWithInterceptors.post(baseURL + "api/v1/messages", {
        messageContent: newMessage,
        chatInfo: chat_id,
      });
      console.log("message: ", res.data);
      setMessages((prev) => [...prev, res.data]);
      // setMessages([...messages, res.data])
      // socket.current.emit("new message", chatMessage)
      socket.current.emit("new message", res.data);
      setNewMessage("");
    } catch (err) {
      if (err.response.data.message) {
        navigate("/handleerror", {
          state: {
            message: err.response.data.message,
            path: location.pathname,
          },
        });
      } else {
        navigate("/somethingwentwrong");
      }
    }
  };

  return (
    <div className="messages">
      {chatName ? (
        <>
          <div>
            <h3>{chatName}</h3>
            {messages.length > 0 ? (
              <>
                {messages?.map((message) => (
                  <div key={message._id}>
                    <p>{message.messageContent}</p>
                    <br />
                  </div>
                ))}
              </>
            ) : (
              <p></p>
            )}
          </div>

          <form className="newMessageForm">
            <input
              className="newMessageInput"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSubmit} className="newMessageButton">
              Send
            </button>
          </form>
        </>
      ) : (
        <>
          <p>Select a chat to display messages !!!</p>
        </>
      )}
    </div>
  );
};

export default Messages;
