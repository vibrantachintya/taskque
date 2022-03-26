import { Routes, Route } from "react-router";
import { TodoHome } from "../Components/Landing/TodoHome";
import { TodoDisplay } from "../Components/Item/TodoDisplay";
import { Signup } from "../Components/Login/Signup";
import { Signin } from "../Components/Login/Signin";

export const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<TodoHome />} />
            <Route exact path="/todo/:id" element={<TodoDisplay />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/signin" element={<Signin />} />
        </Routes>
    )
}