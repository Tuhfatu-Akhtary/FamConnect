import "./Register.scss";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Register=()=>{

    const [inputs,setInputs]= useState({
        user_name:"",
        first_name:"",
        last_name:"",
        email:"",
        password:"",
    })

    const [err,setErr]= useState(null)
    const navigate=useNavigate()

    const handleChange= (e) =>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value }));
    };

   const handleClick = async e => {

       e.preventDefault()

       try {
           await axios.post("http://localhost:8800/server/auth/register", inputs);
           navigate("/login");
       } catch (err) {
           setErr(err.response.data)
       }
   }

    console.log(err);
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
                        <input type="text" placeholder="User Name" name="user_name" onChange={handleChange}/>
                        <input type="text" placeholder="First Name" name="first_name" onChange={handleChange}/>
                        <input type="text" placeholder="Last Name" name="last_name" onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Register;