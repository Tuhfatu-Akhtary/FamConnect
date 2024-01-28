import "./post.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link} from "react-router-dom";
import Comments from "../comments/Comments.jsx";
import {useContext, useState} from "react";
import moment from "moment";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {makeRequest} from "../../axios.js";
import {AuthContext} from "../../context/authContext.jsx";

// eslint-disable-next-line react/prop-types
const Post=({ post })=>{

    const [commentOpen, setCommentOpen]=useState(false);
    const [menuOpen, setmenuOpen]=useState(false);

    const { currentUser } = useContext(AuthContext)
    // eslint-disable-next-line react/prop-types
    const { isLoading, error, data } = useQuery(["likes", post.id], () =>
        // eslint-disable-next-line react/prop-types
        makeRequest.get("/likes?postId="+post.id).then(res=>{
            return res.data;
        })
    );
    const queryClient = useQueryClient();
    const mutation = useMutation((liked) => {
        if(liked)
            // eslint-disable-next-line react/prop-types
            return makeRequest.delete("/likes?postId="+ post.id)
            // eslint-disable-next-line react/prop-types
            return makeRequest.post("/likes",{postId: post.id});

    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["likes"])
        },
    });

    const deleteMutation = useMutation((postId) => {
            // eslint-disable-next-line react/prop-types
            return makeRequest.delete("/posts/"+ postId);

    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["posts"])
        },
    })

    const handleLike =() =>{
        mutation.mutate(data.includes(currentUser.user_id))
    };

    const handleDelete =() =>{
        // eslint-disable-next-line react/prop-types
        deleteMutation.mutate(post.id)

    };
    return (
        <div className="post">
            <div className="container">
            <div className="user">
                <div className="userInfo">
                    {/* eslint-disable-next-line react/prop-types */}
                    <img src={post.profile_pic} alt=""/>
                    <div className="details">
                        {/* eslint-disable-next-line react/prop-types */}
                        <Link to={`/profile/${post.user_id}`} style={{textDecoration:"none", color:"inherit"}}>
                            {/* eslint-disable-next-line react/prop-types */}
                            <span className="name">{post.user_name}</span>
                            {/* eslint-disable-next-line react/prop-types */}
                            <span className="date">{moment(post.created_at).fromNow()}</span>
                        </Link>
                    </div>
                </div>
                <MoreHorizIcon onClick={()=>setmenuOpen(!menuOpen)}/>
                {/* eslint-disable-next-line react/prop-types */}
                {menuOpen && post.post_user_id=== currentUser.user_id
                    &&(<button onClick={handleDelete}>Delete post</button>)}
            </div>
            <div className="content">
                {/* eslint-disable-next-line react/prop-types */}
                <p>{post.post_content}</p>
                {/* eslint-disable-next-line react/prop-types */}
                <img src={"./upload/"+post.picture} alt=""/>
            </div>
            <div className="info">
                <div className="item">
                    {isLoading ? (
                        "loading"
                    ) : data.includes(currentUser.user_id) ? (
                        <FavoriteIcon style={{color:"red"}} onClick={handleLike}/> )
                        :(<FavoriteBorderIcon onClick={handleLike}/>)}
                    {data?.length} Likes
                </div>
                <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                    <CommentIcon/>
                    See Comments
                </div>
            </div>
                {/* eslint-disable-next-line react/prop-types */}
                {commentOpen && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}

export default Post;



