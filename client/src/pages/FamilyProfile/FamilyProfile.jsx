import "./familyProfile.scss";
import {Link, useLocation} from "react-router-dom";
import {useQuery} from "react-query";
import {makeRequest} from "../../axios.js";
import InfoIcon from "@mui/icons-material/Info.js";
import familyTree from "../../assets/familyTree.png";
import Posts from "../../components/posts/Posts.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {io} from "socket.io-client";

// eslint-disable-next-line react/prop-types
const FamilyProfile=()=>{

    const {currentUser}=useContext(AuthContext);
    const familyId=parseInt(useLocation().pathname.split("/")[2])
    const { isLoading:familyLoading, error:familyError, data:familyData } = useQuery(["family"], () =>
        // eslint-disable-next-line react/prop-types
        makeRequest.get("/auth/find/" +familyId).then(res=>{
            return res.data;
        })
    );
    console.log(familyData);
    const handleJoin=()=>{
        try {
            makeRequest.post("/family" ,{familyId:familyData[0].family_id,userId:currentUser.user_id})
        }catch(err){
            console.log(err);
        }


    }
    const handleRequest=()=>{
        try{
            makeRequest.post("/family/familyRequest",{familyId:familyData[0].family_id})
        }catch (err)
        {
            console.log(err)
        }
    }

    useEffect(()=>{
        const socket = io("http://localhost:8800");
        console.log(socket);
    },[])
    return(
        <div className="familyProfile">
            {familyError ? "Something went wrong"
                :familyLoading ? "loading"
                    :
                <>
                    <div className="images">
                    <img src={familyData[0].cover_pic} alt="" className="cover"/>
                    <img src={familyData[0].profile_pic} alt="" className="profilePic"/>
                </div>
                    <div className="profileContainer">
                        <div className="userInfo">
                            <div className="left">
                                <Link to="/familyProfile">
                                    <InfoIcon/>
                                </Link>
                            </div>
                            <div className="center">
                                <span>{familyData[0].family_name}</span>
                                {/*{familyId === currentUser.user_id ? (<button>Update</button>): (<button>Add</button>)}*/}
                                <button onClick={handleJoin}>Join</button>
                                <button onClick={handleRequest}>Add Family</button>
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
}

export default FamilyProfile;