import "./NavBar.scss";
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LightModeIcon from '@mui/icons-material/LightMode';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import {useState} from "react";
import {makeRequest} from "../../axios.js";

const NavBar=()=>{

    const {toggle, darkMode } = useContext(DarkModeContext)
    const { currentUser } = useContext(AuthContext)
    const [input,setInput]=useState("");
    const [searchResults, setSearchResults] = useState([]);


    const fetchData =(value)=>{
        fetch("http://localhost:8800/server/auth/searchFamily",{query:value}).then((response)=>response.json())
            .then((json)=>{
                setSearchResults(json);
            });
    };

    const handleChange =(value)=>{
        setInput(value)
        fetchData(value)
    }
    const navigate=useNavigate();
    const handleSuggestionClick = (familyName) => {
        // Redirect to the family profile page when a suggestion is clicked
        // You need to define the correct URL structure for family profiles
        navigate("/family-profile/${familyName}") ;
    };
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
                    <input type="text"
                           placeholder="Search"
                           autoComplete="off"
                           name="search"
                           onChange={(e)=>handleChange(e.target.value)}
                           value={input}/>
                </div>
                <div className="searchresult">
                    {searchResults.map((result, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionClick(result.familyName)}
                        >
                            {result.familyName}
                        </div>
                    ))}
                </div>
            </div>
            <div className="right">
                <Link to="/messenger">
                <ChatIcon className="icons"/>
                </Link>
                <NotificationsNoneIcon className="icons"/>
                <Link to={`/profile/${currentUser.user_id}`}  style={{textDecoration:"none"}}>
                    <div className="user">
                        <img src={currentUser.profile_pic} alt=""/>
                        <span>{currentUser.user_name}</span>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default NavBar;