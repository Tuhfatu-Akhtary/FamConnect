import "./createFamily.scss";
import {Link} from "react-router-dom";

const createFamily=()=>{
    return(
            <div className="createFamily">
                <div className="card">
                    <div className="up">
                        <h1>FamConnect</h1>
                    </div>
                    <div className="center">
                        <h1>Create Family</h1>
                        <div className="forms">
                            <form>
                                <input type="text" placeholder="Authentication Code"></input>
                                <div className="buttons">
                                    <button>Enter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bottom">
                        <span>Don't you have an existing Family?</span>
                        <Link to="/createFamily">
                            <button>Join Family</button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default createFamily;
