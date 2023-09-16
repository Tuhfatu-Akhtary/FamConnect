import "./NavBar.scss";
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LightModeIcon from '@mui/icons-material/LightMode';
import {Link} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext.jsx";
import {AuthContext} from "../../context/authContext.jsx";

const NavBar=()=>{

    const {toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)
    return(
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span>Famconnect</span>
                </Link>
                <HomeIcon/>
                {darkMode ? <LightModeIcon onClick={toggle}/>:<DarkModeIcon onClick={toggle}/>}
                <Diversity3Icon/>
                <div className="search">
                    <SearchIcon/>
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <div className="right">
                <ChatIcon/>
                <NotificationsNoneIcon/>
                <AccountCircleIcon/>
                <div className="user">
                    <img src={currentUser.profilePic} alt=""/>
                    <span>{currentUser.name}</span>
                </div>
            </div>
        </div>
    )
};

export default NavBar;