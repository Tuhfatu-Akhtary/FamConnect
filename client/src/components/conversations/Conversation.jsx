import "./conversation.scss";
import {useQuery} from "react-query";
import {makeRequest} from "../../axios.js";

// eslint-disable-next-line react/prop-types
const Conversation = ({conversation,onSelectConversation}) =>{
    return(
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <div className="conversation" key={conversation.id} onClick={()=>onSelectConversation(conversation.conv_id,conversation.user_id)}>
                {/* eslint-disable-next-line react/prop-types */}
                <img className="conversationImg" src={conversation.profile_pic} alt=""/>
                {/* eslint-disable-next-line react/prop-types */}
                <span className="conversationName">{conversation.user_name}</span>

            </div>
        </div>
    )
}

export default Conversation;