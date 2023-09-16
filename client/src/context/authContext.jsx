import {createContext, useEffect, useState} from "react";
import pro from "../assets/profile.jpg";
export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) =>{
    const [currentUser,setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login =()=>{
        setCurrentUser({
            id:1,
            name:"Swaty",
            profilePic:{pro}
        });
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{currentUser, login}}>{children}</AuthContext.Provider>
    )
};