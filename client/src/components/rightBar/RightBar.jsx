import "./Rightbar.scss";
import img from "../../assets/20086342.jpeg"

const RightBar=()=>{
    return(
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Suggestions</span>
                    <div className="user">
                        <div className="userInfo">
                        <img src={img} alt="user"/>

                        <span>userName</span>
                        </div>

                    <div className="buttons">
                    <button>Add</button>
                    <button>Cancel</button>
                    </div>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={img} alt="user"/>

                            <span>userName</span>
                        </div>

                        <div className="buttons">
                            <button>Add</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <span>Active Users</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src={img} alt="user"/>
                            <div className="online"/>

                            <span>userName</span>
                        </div>
                        <div className="activetime">
                            <span>1 min ago</span>
                        </div>

                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src={img} alt="user"/>
                            <div className="online"/>

                            <span>userName</span>
                        </div>
                        <div className="activetime">
                            <span>1 min ago</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
};

export default RightBar;