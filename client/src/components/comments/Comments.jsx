import "./comments.scss";
import {AuthContext} from "../../context/authContext.jsx";
import {useContext, useState} from "react";
import SendIcon from '@mui/icons-material/Send';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {makeRequest} from "../../axios.js";
import moment from "moment";

// eslint-disable-next-line react/prop-types
   const Comments = ({postId}) => {
       const [content, setContent] = useState("");
       const {currentUser} = useContext(AuthContext);
       const { isLoading, error, data } = useQuery(["comments"], () =>
           makeRequest.get("/comments?postId="+postId).then(res=>{
               return res.data;
           })
       );

       const queryClient = useQueryClient();

       const mutation = useMutation((newComment) => {
           return makeRequest.post("/comments", newComment)
       }, {
           onSuccess: () => {
               // Invalidate and refetch
               queryClient.invalidateQueries(["comments"])
           },
       })
       const handleClick = async(e) =>{
           e.preventDefault();
           mutation.mutate({content, postId})
           setContent("");
       }
        return (
            <div className="comments">
                <div className="write">
                    <img src={currentUser.profile_pic} alt=""/>
                    <input type="text" placeholder="Write a comment"
                           value={content}
                           onChange={e=>{
                        setContent(e.target.value)
                    }}/>
                    <button onClick={handleClick}>
                    <SendIcon className="send"/>
                    </button>
                </div>
                {isLoading
                    ? "loading" :
                    data.map(comment => (
                        <div className="comment" key={comment.comment_id}>
                            <img src={comment.profile_pic} alt=""/>
                            <div className="info">
                                <span>{comment.user_name}</span>
                                <p>{comment.comment_content}</p>
                            </div>
                            <span className="date">{moment(comment.created_at)}</span>
                        </div>
                    ))}
            </div>
        );
    };

export default Comments;


