import "./LeftBar.scss";
import logout from "../../assets/logout.png"
import family from "../../assets/family.png"
import event from "../../assets/events.png"
import memories from "../../assets/memories.png"
import settings from "../../assets/settings.png"
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";

const LeftBar=()=>{

    const { currentUser } = useContext(AuthContext)
    return(
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src={currentUser.profilePic} alt=""/>
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
                    <div className="item">
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
