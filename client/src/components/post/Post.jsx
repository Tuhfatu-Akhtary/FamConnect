import "./post.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {Link} from "react-router-dom";
import Comments from "../comments/Comments.jsx";
import {useState} from "react";
import moment from "moment";


// eslint-disable-next-line react/prop-types
const Post=({ post })=>{

    const  [commentOpen, setCommentOpen]=useState(true)
    const liked= false;

    /*function time() {
        var startTime, endTime;

        function start() {
            startTime = {post.created_at};
        }

        function end() {
            endTime = new Date();
            var timeDiff = endTime - startTime; //in ms
            // strip the ms
            timeDiff /= 1000;

            // get seconds
            var seconds = Math.round(timeDiff);
            return seconds;
        }
    }*/
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
                            <span className="date">{moment(post.created_at).fromNow()}</span>
                        </Link>
                    </div>
                </div>
                <MoreHorizIcon/>
            </div>
            <div className="content">
                {/* eslint-disable-next-line react/prop-types */}
                <p>{post.post_content}</p>
                {/* eslint-disable-next-line react/prop-types */}
                <img src={post.picture} alt=""/>
            </div>
            <div className="info">
                <div className="item">
                    {liked ? <FavoriteIcon/> :<FavoriteBorderIcon/>}
                    12 Likes
                </div>
                <div className="item" onClick={()=>setCommentOpen(commentOpen)}>
                    <CommentIcon/>
                    12 Comments
                </div>
                <div className="item">
                    <ShareIcon/>
                    12 shares
                </div>
            </div>
                {commentOpen && <Comments/>}
            </div>
        </div>
    )
}

export default Post;