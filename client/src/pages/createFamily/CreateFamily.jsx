import "./createFamily.scss";
import {Link} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateFamily=()=> {
    const [inputs, setInputs] = useState({
        family_name: "",
        address: "",
        description: "",
        authentication_code: "",

    });
    function generateAuthenticationCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    }

 const authcode=generateAuthenticationCode(10)

    const handleChange = (e) => {
            const {name, value} = e.target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        };


        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                await axios.post("http://localhost:8800/server/auth/familyCreate", inputs);
                navigate("/login");
            } catch (err) {
                setErr(err.response.data)
            }

        };

        const [err, setErr] = useState(null)
        const navigate = useNavigate();
        console.log(err);
        return (
            <div className="createFamily">
                <div className="card">
                    <div className="up">
                        <h1>FamConnect</h1>
                    </div>
                    <div className="center">
                        <h1>Create Family</h1>
                        <div className="forms">
                            <form>
                                <input type="text" placeholder="Family Name" name="family_name"
                                       onChange={handleChange}/><br/>
                                <input type="text" placeholder="Address" name="address" onChange={handleChange}/><br/>
                                <input type="text" placeholder="Description" name="description"
                                       onChange={handleChange}/><br/>
                                <input type="text" placeholder="Authentication Code" name="authentication_code"
                                       onChange={handleChange} value={authcode}/>
                                <button onClick={generateAuthenticationCode}>Code</button>
                                <br/>
                                <div className="buttons">
                                    <button onClick={handleSubmit}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bottom">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <span>Don't you have an existing Family?</span>
                        <Link to="/joinFamily">
                            <button>Join Family</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

export default CreateFamily;
