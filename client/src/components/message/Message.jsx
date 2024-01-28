import "./message.scss";
import {useQuery} from "react-query";
import {makeRequest} from "../../axios.js";
import moment from "moment/moment.js";

// eslint-disable-next-line react/prop-types
const Message =({message,own}) =>{

    return(
        // eslint-disable-next-line react/prop-types
        <div className={own ?"message own":"message"} key={message.message_id}>
            <div className="messageTop" >
                {/* eslint-disable-next-line react/prop-types */}
                <img className="messageImg" src={message.profile_pic} alt=""/>
                {/* eslint-disable-next-line react/prop-types */}
                <p className="messageText">{message.message_content}</p>
            </div>
            <div className="messageBottom">
                {moment(message.sent_at).fromNow()}

            </div>

        </div>
    )
}
export default Message;