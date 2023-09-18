import "./Profile.scss";
import cover from "../../assets/cover.jpg";
import profilePic from "../../assets/profilePic.jpg";
import InfoIcon from '@mui/icons-material/Info';
import  familyTree from "../../assets/familyTree.png";
import {Link} from "react-router-dom";
import Posts from "../../components/posts/Posts.jsx";
const Profile=()=>{
    return(
        <div className="profile">
            <div className="images">
                <img src={cover} alt="" className="cover"/>
                <img src={profilePic} alt="" className="profilePic"/>
            </div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="left">
                        <Link to="/userProfile">
                            <InfoIcon/>
                        </Link>
                    </div>
                    <div className="center">
                        <span>User Name</span>
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