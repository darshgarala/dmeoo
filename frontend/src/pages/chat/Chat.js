import React, { useEffect, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/logosearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/conversation/Conversation";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const user = useSelector((state) => state.authRedecer.authData);
  console.log("object=", user);

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(user.data._id);
        setChats(data.data);
        console.log("chat data= ", data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);
  return (
    <>
      <div className="Chat">
        {/* left side */}
        <div className="Left-side-chat">
          <LogoSearch />
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div>
                  <Conversation data={chat} currentUserId={user.data._id} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Side */}

        <div className="Right-side-chat">chat right</div>
      </div>
    </>
  );
};

export default Chat;
