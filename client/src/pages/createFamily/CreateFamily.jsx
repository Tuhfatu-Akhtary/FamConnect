import "./createFamily.scss";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext.jsx";
import {makeRequest} from "../../axios.js";

const CreateFamily=()=> {
    const {currentUser} = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        family_name: "",
        address: "",
        description: "",

    });


    const handleChange = (e) => {
            const {name, value} = e.target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        };

    const [err, setErr] = useState(null)
    const navigate = useNavigate();
    console.log(err);
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                makeRequest.post("/auth/createFamily", inputs);
                navigate("/");
            } catch (err) {
                setErr(err.response.data)
            }

        };

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
                                <div className="buttons">
                                    <button onClick={handleSubmit}>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="bottom">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <span>Do you have an existing Family?</span>
                        <Link to="/joinFamily">
                            <button>Join Family</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

export default CreateFamily;
