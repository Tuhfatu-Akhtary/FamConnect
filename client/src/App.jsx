import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
]);
function App(){
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}
export default App;