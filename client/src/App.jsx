import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
    createBrowserRouter, Navigate, Outlet,
    RouterProvider,
} from "react-router-dom";
import NavBar from "./components/navBar/NavBar.jsx";
import LeftBar from "./components/leftBar/LeftBar.jsx";
import RightBar from "./components/rightBar/RightBar.jsx";
import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";
import FamilyProfile from "./pages/FamilyProfile/FamilyProfile.jsx";
import "./style.scss"
import {useContext} from "react";
import {DarkModeContext} from "./context/darkModeContext.jsx";
import {AuthContext} from "./context/authContext.jsx";
import FamilyTree from "./components/familyTree/FamilyTree.jsx";
import { QueryClient, QueryClientProvider } from 'react-query'
import Welcome from "./pages/Welcome/Welcome.jsx";
import JoinFamily from "./pages/joinFamily/JoinFamily.jsx";
import CreateFamily from "./pages/createFamily/CreateFamily.jsx";
import Messenger from "./pages/messenger/Messenger.jsx";
import Conversation from "./components/conversations/Conversation.jsx";
function App(){

    const {currentUser} = useContext(AuthContext);

    const {darkMode} = useContext(DarkModeContext);

    const queryClient = new QueryClient();

    const Layout =()=>{
        return(
            <QueryClientProvider client={queryClient}>
            <div className={`theme-${darkMode ? "dark" : "light"}`}>
                <NavBar/>
                <div style={{display:"flex"}}>
                    <LeftBar/>
                    <div style={{flex:6}}>
                        <Outlet/>
                    </div>
                    <RightBar/>
                </div>
            </div>
            </QueryClientProvider>
        )
    };

    const LayoutChat =()=>{
        return(
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <NavBar/>
                    <Messenger/>
                </div>
            </QueryClientProvider>
        )
    };

    // eslint-disable-next-line react/prop-types
    const ProtectedRoute = ({ children }) =>{
        if(!currentUser){
            return <Navigate to="/login"/>
        }

        return children;
    }

    const router = createBrowserRouter([
        {
           path:"/",
           element: (<ProtectedRoute>
               <Layout/>
           </ProtectedRoute>),
           children:[
               {
                   path:"/",
                   element:<Home/>
               },
               {
                   path:"/profile/:id",
                   element:<Profile/>
               },
               {
                   path: "/familyProfile/:id",
                   element: <FamilyProfile/>,
               },

               {
                   path: "/familytree/:id",
                   element: <FamilyTree/>,
               },
               {
                   path: "/welcome",
                   element:<Welcome/>,
               },
               {
                   path:"/joinFamily",
                   element:<JoinFamily/>,
               },
               {
                   path:"/createFamily",
                   element:<CreateFamily/>,
               },


           ]
        },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
        {
            path: "/messenger",
            element: (<ProtectedRoute>
                    <LayoutChat/>
                   </ProtectedRoute>)
        },
]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
export default App;