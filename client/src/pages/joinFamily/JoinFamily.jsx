import "./JoinFamily.scss"
import {Link, useNavigate} from "react-router-dom";
import {makeRequest} from "../../axios.js";
import {useQuery} from "react-query";
import {useState} from "react";
import Family from "../../components/Family/Family.jsx";

const JoinFamily=()=>{
        const [selectedFamilyId,setSelectedFamilyId]= useState(null);
        const { isLoading, error, data } = useQuery(["families"], () =>
            // eslint-disable-next-line react/prop-types
            makeRequest.get("/auth/families").then((res) => {
                return res.data;
            })
        );
        console.log(data);
     const navigate=useNavigate();
    const handleSelectFamily = (selectedFamilyId) => {
        setSelectedFamilyId(selectedFamilyId);
                // makeRequest.get("/auth/find/:familyId"+selectedFamily);
                 navigate(`/familyProfile/${selectedFamilyId}`);

    }
    console.log(selectedFamilyId);

    return(
        <div className="joinFamily">
                  <div className="card">
                  <div className="up">
                  </div>
                 <div className="center">
                     {error
                         ? "Something went wrong"
                         : isLoading
                             ? "loading"
                             : data.map((family) => (
                                 <>
                                     <Family family={family} onSelectFamily={handleSelectFamily}/>
                                 </>
                             ))}
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