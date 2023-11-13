import "./Profile.scss";
import InfoIcon from '@mui/icons-material/Info';
import  familyTree from "../../assets/familyTree.png";
import {Link} from "react-router-dom";
import Posts from "../../components/posts/Posts.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import { useContext} from "react";

const Profile=()=>{

    const { currentUser } = useContext(AuthContext);
    return(
        <div className="profile">
            <div className="images">
                <img src={currentUser.cover_pic} alt="" className="cover"/>
                <img src={currentUser.profile_pic} alt="" className="profilePic"/>
            </div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="left">
                        <Link to="/userProfile">
                            <InfoIcon/>
                        </Link>
                    </div>
                    <div className="center">
                        <span>{currentUser.user_name}</span>
                    </div>
                    <div className="right">
                        <Link to="/familyTree">
                            <img src={familyTree} alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
            <Posts/>
        </div>
    )
};

export default Profile;