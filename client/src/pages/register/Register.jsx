import "./Register.scss";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Stepper, StepLabel, Step} from "@mui/material";


const Register=()=>{
    const [step, setStep]=useState(1);
     const [inputs, setInputs] = useState({
         first_name: "",
         last_name: "",
         father_name:"",
         mother_name:"",
         dob:"",
         gender:"",
         email:"",
         phone_no:"",
         user_name:"",
         password: "",
         Cpassword: "",
     });

    const nextStep = () => {
        setStep(step + 1);

    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        })
        ;
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/server/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setErr(err.response.data)
        }

    };
    function showStep (step){
        switch (step){
            case 1:
                return(
                        <div className="forms">
                            <input type="text" placeholder="First Name" name="first_name" onChange={handleChange} />
                            <input type="text" placeholder="Last Name" name="last_name" onChange={handleChange}/>

                            <div className="buttons">
                                <button onClick={nextStep} >Next</button>
                            </div>
                        </div>
                );
            case 2:
                return (
                    <div className="forms">
                            <input type="text" placeholder="Father's Name" name="father_name" onChange={handleChange} />
                            <input type="text" placeholder="Mother's Name" name="mother_name" onChange={handleChange} />
                            <input type="date" placeholder="Date of Birth" name="dob" onChange={handleChange}/>
                            <input type="text" placeholder="Gender" name="gender" onChange={handleChange}/>

                            <div className="buttons">
                                <button onClick={prevStep} >Previous</button>
                                <button onClick={nextStep} >Next</button>
                            </div>
                        </div>

                );
            case 3:
                return (

                        <div className="forms">
                            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                            <input type="tel" placeholder="Contact Number" name="phone_no" onChange={handleChange}/>
                            <input type="text" placeholder="User Name" name="user_name" onChange={handleChange}/>
                            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                            <input type="password" placeholder=" Confirm Password" name="Cpassword" onChange={handleChange}/>

                            <div className="buttons">
                                <button onClick={prevStep} >Previous</button>
                                <button onClick={nextStep} >Next</button>
                            </div>
                        </div>

                );
            case 4:
                return (

                        <div className="forms">
                            <input type="file" placeholder="Profile Picture" name="profile_pic"/>
                            <input type="file" placeholder="Cover Picture" name="cover_pic"/>

                            <div className="buttons">
                                <button onClick={prevStep} >Previous</button>
                                <button onClick={handleSubmit} >Register</button>
                            </div>
                        </div>

                );
            default:
                return null;
        }

    }


    const [err,setErr]= useState(null)
    const navigate=useNavigate();
    console.log(err);
    return(
        <div className="register">
            <div className="card">
                <div className="up">
                    <h1>FamConnect</h1>
                </div>
                    <div className="center">
                        <h1>Registration</h1>
                        <div className="center-stepper">
                            <Stepper style={{width: "20%"}} activeStep={step-1} orientation="horizontal">
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                                <Step>
                                    <StepLabel></StepLabel>
                                </Step>
                            </Stepper>
                        </div>
                    <form onSubmit={handleSubmit}>
                        {showStep(step)}
                    </form>
                </div>
                <div className="bottom">
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </div>

    )
};

export default Register;