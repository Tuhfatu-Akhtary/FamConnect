import "./family.scss";

// eslint-disable-next-line react/prop-types
const Family=({family,onSelectFamily})=>{
    return(
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <div className="family" key={family.family_id} onClick={()=>onSelectFamily(family.family_id)} >
                {/* eslint-disable-next-line react/prop-types */}
                <img src={family.profile_pic} alt="" />
                <div className="info">
                    {/* eslint-disable-next-line react/prop-types */}
                    <span>{family.family_name}</span>
                </div>
            </div>
        </div>
    )
}
export default Family;