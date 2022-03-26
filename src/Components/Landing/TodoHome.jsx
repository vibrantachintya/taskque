import { useEffect, useState } from "react";
import { TodoInput } from "../Add/TodoInput";
import { TodoList } from "../List/TodoList";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TodoStats } from "../Flash/TodoFlash";
import { setUserId } from "../../Redux/User/action";
import { useNavigate } from "react-router-dom";

const Section = styled.section`
    display: flex;
    margin: 50px 5%;
    justify-content: space-between; 
    align-items: flex-start;
`;

export const TodoHome = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [status, setStatus] = useState("hide");

    useEffect(() => {
        if(!localStorage.getItem("user_id")) {
            navigate("/signin");
        } else {
            dispatch(setUserId(localStorage.getItem("user_id")));
        }
    }, []);

    const handleStatus = (val) => {
        setStatus(val);
    }

    return (
        <Section>
            <TodoInput status={status} showAddTask={handleStatus} />
            <TodoList showAddTask={handleStatus} />
            <TodoStats />
        </Section>
    )
};