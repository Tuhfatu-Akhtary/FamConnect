import "./NavBar.scss";
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
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
                <Link to="/">
                    <HomeIcon className="icons"/>
                </Link>

                {darkMode ? <LightModeIcon className="icons" onClick={toggle}/>:<DarkModeIcon className="icons" onClick={toggle}/>}
                <Diversity3Icon className="icons"/>
                <div className="search">
                    <SearchIcon className="icons"/>
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <div className="right">
                <ChatIcon className="icons"/>
                <NotificationsNoneIcon className="icons"/>
                <Link to="/profile/:id" style={{textDecoration:"none"}}>
                    <div className="user">
                        <img src={currentUser.profile_pic} alt=""/>
                        <span>{currentUser.user_name}</span>
                    </div>
                </Link>

            </div>
        </div>
    )
};

export default NavBar;