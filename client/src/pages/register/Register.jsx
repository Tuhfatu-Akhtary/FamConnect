import "./Register.scss";
import {Link} from "react-router-dom";

const Register=()=>{
    return(
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>FamConnect</h1>
                    <p>Where Family Connects Together</p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="First Name"/>
                        <input type="text" placeholder="Last Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;