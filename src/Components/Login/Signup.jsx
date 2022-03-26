import bcryptjs from "bcryptjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignupAPI } from "../../Api/fetch";
import { setUserId } from "../../Redux/User/action";
import { Container, Input, Button, LINK } from "./Login.styles";

export const Signup = () => {

    const user_id = bcryptjs.hashSync((new Date()) + "", 8);

    const [user, setUser] = useState({user_id: user_id});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user_id");
    }, []);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setUser({...user,
          [id]: value
        });    
    };

    const createUser = async (e) => {
        e.preventDefault();
        await userSignupAPI(user);
        dispatch(setUserId(user.user_id));
        localStorage.setItem("user_id", user.user_id);
        navigate("/");
    };

    return (
        <Container center={true}>
            <h2>Signup</h2>
            <div>
                <form onSubmit={createUser}>
                    <Input id="name" type="text" onChange={handleChange} placeholder="Your Name" />
                    <Input id="email" type="email" onChange={handleChange} placeholder="Your Email" />
                    <Input id="pwd" type="password" onChange={handleChange} placeholder="Your Password" />
                    <Button type="submit" />
                </form>
                <LINK to="/signin">
                    Login to your Account
                </LINK>
            </div>
        </Container>
    );
};