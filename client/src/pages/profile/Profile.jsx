import "./Profile.scss";
import InfoIcon from '@mui/icons-material/Info';
import  familyTree from "../../assets/familyTree.png";
import {Link, useLocation} from "react-router-dom";
import Posts from "../../components/posts/Posts.jsx";
import {useQuery} from "react-query";
import {makeRequest} from "../../axios.js";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const Profile=()=>{

    const {currentUser}= useContext(AuthContext);
    const userId=parseInt(useLocation().pathname.split("/")[2])
    const { isLoading, error, data } = useQuery(["user"], () =>
        // eslint-disable-next-line react/prop-types
        makeRequest.get("/users/find/" +userId).then(res=>{
            return res.data;
        })
    );
    console.log(data);
    return(
        <div className="profile">
            {isLoading ? "loading" :
            <><div className="images">
                <img src={data?.cover_pic} alt="" className="cover"/>
                <img src={data?.profile_pic} alt="" className="profilePic"/>
            </div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="left">
                        <Link to="/userProfile">
                            <InfoIcon/>
                        </Link>
                    </div>
                    <div className="center">
                        <span>{data?.user_name}</span>
                        {userId === currentUser.user_id ? (<button>Update</button>): (<button>Add</button>)}
                    </div>
                    <div className="right">
                        <Link to="/familyTree">
                            <img src={familyTree} alt=""/>
                        </Link>
                    </div>
                </div>
            </div>
            <Posts/></>
}
        </div>
    )
};

export default Profile;