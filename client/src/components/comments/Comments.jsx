import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

// eslint-disable-next-line react/prop-types
const Comments = ({ postId }) => {
    const [Content, setContent] = useState("");
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["comments"], () =>
        // eslint-disable-next-line react/prop-types
        makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ Content, postId });
        setContent("");
    };

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profile_pic} alt="" />
                <input
                    type="text"
                    placeholder="Write a comment"
                    value={Content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((comment) => (
                        <div className="comment" key={comment.comment_id}>
                            <img src={comment.profile_pic} alt="" />
                            <div className="info">
                                <span>{comment.user_name}</span>
                                <p>{comment.comment_content}</p>
                            </div>
                            <span className="date">
                {moment(comment.created_at).fromNow()}
              </span>
                        </div>
                    ))}
        </div>
    );
};

export default Comments;