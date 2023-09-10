import "./Login.scss";

const Login=()=>{
    return(
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>FamConnect</h1>
                    <p>Where Family Connects Together</p>
                    <span>Don't you have an account?</span>
                    <button>Register</button>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;