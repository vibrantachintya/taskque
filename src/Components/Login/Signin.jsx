import { userLoginAPI } from "../../Api/fetch";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserId } from "../../Redux/User/action";
import { useNavigate } from "react-router-dom";
import { Container, Input, Button, LINK, Text } from "./Login.styles";
import bcryptjs from "bcryptjs";

export const Signin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        localStorage.removeItem("user_id");
    }, []);

    const signinUser = async (e) => {
        e.preventDefault();
        let res = await userLoginAPI(email, pwd);
        if(res == "invalid") {
            alert("Invalid Username/PWD");
            return;
        }
        dispatch(setUserId(res.user_id));
        localStorage.setItem("user_id", res.user_id);
        navigate("/");
    };

    const demoLogin = () => {
        const user_id = bcryptjs.hashSync((new Date()) + "", 8);
        dispatch(setUserId(user_id));
        localStorage.setItem("user_id", user_id);
        navigate("/");
    };

    return (
        <Container center={true}>
            <h2>Signin</h2>
            <div>
                <form onSubmit={signinUser}>
                    <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
                    <Input id="pwd" type="password" onChange={(e) => setPwd(e.target.value)} placeholder="Your Password" />
                    <Button type="submit" />
                </form>
                <Text onClick={demoLogin}>Click here for 1-click Guest Login</Text>
                <LINK to="/signup">
                    Create New Account
                </LINK>
            </div>
        </Container>
    );
};