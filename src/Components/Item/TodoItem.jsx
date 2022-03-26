import { useEffect, useState } from "react";
import { deleteSingleTodo, getSingleTodo, updateCompletedStatus } from "../../Api/fetch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { deleteTodo, updateTodo } from "../../Redux/Todo/action";
import { getFormattedDate } from "../../Utils/Utils";

const Section = styled.section`
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
`;

const Container = styled.section`
    width: 30%;
    padding: 20px 30px;
    background: white;
    border-radius: 15px;
    margin: 100px auto;
    text-align: center;
`;

export const Button = styled.div`
    font-family: "Montserrat";
    border-radius: 5px;
    outline: none;
    display: block;
    padding: 8px 10px;
    text-align: center;
    margin: 10px auto;
    font-size: 1rem;
    width: 35%;
    background: rgb(237, 193, 211);
    background: linear-gradient(
      90deg,
      rgba(237, 193, 211, 1) 0%,
      rgba(145, 189, 236, 1) 100%
    );
    border: none;
    cursor: pointer;

    a {
        color: black;
        text-decoration: none;
    }
`;

const DisplayFlex = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: center;

    img {
        margin-right: 10px;
    }
`;

const Large = styled.div`
    font-size: 1.2rem;
    margin-bottom: 20px;
`;

const TaskInfo = styled.div`
    width: 40%;
    margin: 10px 0px;
`;

export const TodoItem = () => {

    const {id} = useParams();
    const [task, setTask] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getSingleTodo(id);
            if(res == "404") {

            } else {
                setTask(res.data);
            }
        };
      
        fetchAPI();
    }, [id]);

    const handleClick = async () => {
        await deleteSingleTodo(id);
        dispatch(deleteTodo(id));
        setTask({content: ""});
        navigate("/");
    };

    const handleCompleted = async () => {
        await updateCompletedStatus(id);
        dispatch(updateTodo(id));
        navigate("/");
    };

    return (
        <Section>
            <Container>
                <h2>Task Details</h2>
                <Large>{task.content}</Large>
                <DisplayFlex><img src="/calendar.png" width="30px" /> {getFormattedDate(new Date(task.duedate), "date")}</DisplayFlex>
                <DisplayFlex>
                    <TaskInfo>
                        <div>Status - {task.status}</div>
                    </TaskInfo>
                    <TaskInfo>
                        <div>Priority - {task.priority}</div>
                    </TaskInfo>
                </DisplayFlex>
                <DisplayFlex>
                    <div onClick={handleCompleted}>Mark as Completed</div>
                </DisplayFlex>
                <DisplayFlex>
                    <Button onClick={handleClick}>Delete</Button>
                    <Button onClick={() => navigate("/")}>Close</Button> 
                </DisplayFlex>
            </Container>
        </Section>
    );
};