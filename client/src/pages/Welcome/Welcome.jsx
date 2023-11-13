import "./welcome.scss";
import {Link} from "react-router-dom";


const Welcome=()=>{
    return(
        <div className="Welcome">
            <div className="card">
            <p> Welcome to FamConnect</p>
            <div className="buttons">
                <Link to="/joinFamily">
                    <button>Join Family</button>
                </Link>
                <Link to="/createFamily">
                    <button>Create Family</button>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default Welcome;