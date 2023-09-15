import "./LeftBar.scss";
import logout from "../../assets/logout.png"
import family from "../../assets/family.png"
import event from "../../assets/events.png"
import memories from "../../assets/memories.png"
import settings from "../../assets/settings.png"

const LeftBar=()=>{
    return(
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="" alt=""/>
                        <span>Swaty</span>
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
