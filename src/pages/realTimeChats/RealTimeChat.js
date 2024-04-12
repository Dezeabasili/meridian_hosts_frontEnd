import Chats from "../../components/chats/Chats"
import Messages from "../../components/messages/Messages"
import OnlineFriends from "../../components/onlineFriends/OnlineFriends"
import SearchForFriends from "../../components/searchForFriends/SearchForFriends"
import "./realTimeChat.css"
import React from 'react'

const RealTimeChat = () => {
  return (
    <div className="realTimeChat">
        <SearchForFriends />
        <Chats />
        <Messages />
        <OnlineFriends />
    </div>
  )
}

export default RealTimeChat