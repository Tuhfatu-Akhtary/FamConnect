import "./messenger.scss"
import Conversation from "../../components/conversations/Conversation.jsx";
import Message from "../../components/message/Message.jsx";
import Chatonline from "../../components/chatOnline/Chatonline.jsx";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {makeRequest} from "../../axios.js";
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import { io } from "socket.io-client";

const Messenger =()=>{
    const [selectedConversationId,setSelectedConversationId]=useState(null);
    const [recieverId,setRecieverId]=useState(null);
    const [message, setMessage] = useState("");
    const {currentUser}=useContext(AuthContext);
    const socket=useRef(io("ws://localhost:8900"))

    useEffect(()=>{
        socket.current.emit("addUser",currentUser.user_id)
    },[currentUser])
    socket.current.on("getUsers",users=>{
        console.log(users)
    })
        const { isLoading:loadingConversation,
            error:errorConversation,
            data: conversationData } = useQuery(['conversations'], () =>
            // eslint-disable-next-line react/prop-types
            makeRequest.get("/conversations?user_id="+currentUser.user_id).then((res) => {
                return res.data;
            })
        );

    const { isLoading:loadingMessage,
        error:errorMessage,
        data: messageData } = useQuery(['messages'], () =>
        // eslint-disable-next-line react/prop-types
        makeRequest.get("/messages?conversationId="+selectedConversationId).then((res) => {
            return res.data;
        }),
    {
        enabled: !!selectedConversationId,
    }
    );
    console.log(recieverId);
    console.log(selectedConversationId);
    console.log(messageData);
    console.log(conversationData);

    const handleSelectConversation = (conversationId,recieverId) => {
        setSelectedConversationId(conversationId);
        setRecieverId(recieverId);
    };

        const queryClient = useQueryClient();
        const mutation = useMutation((newMessage) => {
            return makeRequest.post("/messages", newMessage)
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries(["messages"])
            },
        })
        const handleSubmit = async(e) =>{
            e.preventDefault();
            mutation.mutate({message,selectedConversationId,recieverId});
            setMessage("");
        }

    return(
        <div>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search Friends" className="chatMenuInput"/>
                    {errorConversation
                        ? "something went wrong"
                        : loadingConversation
                            ? "loading"
                            :conversationData.map((conversation) => (
                                <>
                                <Conversation conversation={conversation} onSelectConversation={handleSelectConversation}/>
                                </>
                            ))}

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {selectedConversationId ?
                        <div>
                    <div className="chatBoxTop">
                        {errorMessage
                            ? "something went wrong"
                            : loadingMessage
                                ? "loading"
                                :messageData.map((message) => (
                                    <>
                                        <Message message={message} own={message.sender_user_id===currentUser.user_id}/>
                                    </>
                                ))}
                    </div>
                            <div className="chatBoxBottom">
                                <form onSubmit={handleSubmit}>
                                <textarea className="chatMessageInput"
                                placeholder="Write message.."
                                          value={message}
                                          onChange={(e) => setMessage(e.target.value)}></textarea>
                                <button type="Submit" className="chatSubmitButton">Send</button>

                                </form>
                            </div>

                        </div> :<span className="noConversation">Open a conversation to start chat</span>
                        }
            </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <Chatonline/>
                </div>
            </div>

        </div>
        </div>
    );
}
export default Messenger;

