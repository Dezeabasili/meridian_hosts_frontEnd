import "./chats.css"
import {useEffect, useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { useAuthContext } from "../../context/authContext";
import { useSearchContext } from "../../context/searchContext";
import {RotatingLines} from 'react-loader-spinner'
import { baseURL } from "../../context/authContext";

const Chats = () => {
    const [chats, setChats] = useState()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosWithInterceptors = useAxiosInterceptors();
    const { auth } = useAuthContext();
    const { setMessages, setChatName, setChat_id, previousChat_id } = useSearchContext();

    useEffect(() => {
        const getAllChats = async () => {
            try {
            setLoading(true);
            const res = await axiosWithInterceptors.get(baseURL + "/chats")
            console.log("chats: ", res.data);
            setChats(res.data)
            setLoading(false);

            } catch (err) {
                if (err.response.data.message) {
                    navigate('/handleerror', {state: {message: err.response.data.message, path: location.pathname}})
                  } else {
                    navigate('/somethingwentwrong')
                  }
            }
        }

        getAllChats()
        
    }, [])

    const retrieveName = (eachChat) => {
        // if group chat, return chat name
        if (eachChat.groupChat) return eachChat.chatName

        // else return name of chat partner
        let chatPartner;
        eachChat.members.forEach(member => {
            if (member._id != auth.user_id) {
                chatPartner = member.name
            }
        })
        return chatPartner
    }

    const downloadMessages = async (chat) => {
        try {
            const res = await axiosWithInterceptors.get(baseURL + `/messages/${chat._id}`)
            console.log(res.data)
            setMessages(res.data)
            setChatName(retrieveName(chat))
            setChat_id(prev => {
              previousChat_id.current = prev
              return chat._id
            })
            
        } catch (err) {
            if (err.response.data.message) {
                navigate('/handleerror', {state: {message: err.response.data.message, path: location.pathname}})
              } else {
                navigate('/somethingwentwrong')
              }

        }
    }


  return (
    <div className="chats">
         {loading ? (
        <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
      ) : (
        <>
          {chats.length > 0 ? (
            <>
              {chats?.map((chat) => (
                <div key={chat._id}>                
                  <p onClick={() => downloadMessages(chat)} style={{"textTransform": "capitalize"}}>{retrieveName(chat)}</p>                
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No chat to display !!!</p>
          )}
        </>
      )}
    </div>
  )
}

export default Chats