import "./NavBar.scss";
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import {Link} from "react-router-dom";
const NavBar=()=>{
    return(
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{textDecoration:"none"}}>
                <span>famconnect</span>
                </Link>
                <HomeIcon/>
                <DarkModeIcon/>
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
                    <img src="" alt=""/>
                    <span>Swaty</span>
                </div>
            </div>
        </div>
    )
};

export default NavBar;