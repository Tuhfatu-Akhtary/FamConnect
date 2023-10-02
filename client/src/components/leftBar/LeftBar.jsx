import "./LeftBar.scss";
import logout from "../../assets/logout.png"
import family from "../../assets/family.png"
import event from "../../assets/events.png"
import memories from "../../assets/memories.png"
import settings from "../../assets/settings.png"
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LeftBar=()=>{
    const [err,setErr]= useState(null)
    const navigate=useNavigate();
    const handleClick =async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8800/server/auth/logout");
            navigate("/login");
        } catch (err) {
            setErr(err.response.data)
        }

    };

    const { currentUser } = useContext(AuthContext)
    return(
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profile_pic} alt=""/>
                        <span>{currentUser.user_name}</span>
                    </div>

                    <div className="item">
                        <img src={family} alt="family"/>
                        <span>Family</span>
                    </div>
                    <div className="item">
                        <img src={event} alt="events"/>
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={memories} alt="memories"/>
                        <span>Memories</span>
                    </div>
                    <div className="item">
                        <img src={settings} alt="setting"/>
                        <span>Settings</span>
                    </div>
                    <div className="item" onClick={handleClick}>
                        <img src={logout} alt="logout"/>
                        <span>Log out</span>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    )
};

export default LeftBar;
