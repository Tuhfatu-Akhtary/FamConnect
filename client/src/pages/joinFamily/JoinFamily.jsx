import "./JoinFamily.scss"
import {Link} from "react-router-dom";

const JoinFamily=()=>{
    return(
        <div className="joinFamily">
            <div className="card">
                <div className="up">
                    <h1>FamConnect</h1>
                </div>
                <div className="center">
                    <h1>Join family</h1>
                    <div className="forms">
                    <form>
                        <input type="text" placeholder="Authentication Code"/>
                        <div className="buttons">
                            <button>Enter</button>
                        </div>
                    </form>
                    </div>
                </div>
                <div className="bottom">
                    <span>Don't you have an existing Family?</span>
                    <Link to="/createFamily">
                        <button>Create Family</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JoinFamily;