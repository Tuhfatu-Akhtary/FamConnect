import "./chatOnline.scss";

const Chatonline =() =>{
    return(
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt=""/>
                    <div className="chatOnlineBadge"></div>

                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}
export default Chatonline;