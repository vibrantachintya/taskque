import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../../Api/fetch";
import { addTodo } from "../../Redux/Todo/action";
import { getDate } from "../../Utils/Utils";
import { Container, Section } from "./TodoInput.styles";
import styled from "styled-components";

export const Input = styled.input`
    border-radius: 5px;
    border: 1px solid #E0E0E0;
    outline: none;
    display: block;
    padding: 8px 10px;
    text-align: center;
    margin: 10px auto 15px;
    font-size: 1rem;
    min-width: 240px;
`;

export const Select = styled.select`
    border-radius: 5px;
    border: 1px solid #E0E0E0;
    outline: none;
    display: block;
    padding: 8px 10px;
    text-align: center;
    margin: 10px auto 15px;
    font-size: 1rem;
    min-width: 240px;
`;

export const Button = styled.button`
    font-family: "Montserrat";
    border-radius: 5px;
    outline: none;
    display: block;
    padding: 8px 10px;
    text-align: center;
    margin: 10px auto;
    font-size: 1.2rem;
    min-width: 240px;
    background: rgb(237, 193, 211);
    background: linear-gradient(
      90deg,
      rgba(237, 193, 211, 1) 0%,
      rgba(145, 189, 236, 1) 100%
    );
    border: none;
    cursor: pointer;
`;

const CenterDiv = styled.div`
    text-align: center;
    margin: 20px 0px;
`;

export const TodoInput = ({status, showAddTask}) => {

    const { user_id } = useSelector(state => state.user_id);

    const [task, setTask] = useState({user_id, status: "Pending", content: "", priority: "Normal", duedate: getDate()});
    const [google, setGoogle] = useState();

    console.log(google);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const {id, value} = e.target;
        setTask({...task,
          [id]: value
        });
        if(task.user_id == "")
            setTask({...task, user_id: user_id});
    };

    const addTask = () => {
        if(task.content != "") {
        const fetchAPI = async () => {
            const res = await postTodo(task);
            dispatch(addTodo(res.data));
            if(google) {
                const url = `https://calendar.google.com/calendar/u/0/r/eventedit?text=%5BTaskque%5D+-+Task+Reminder&details=${encodeURI(task.content)}&dates=${task.duedate.replaceAll("-", "")}T043000Z/${parseInt(task.duedate.replaceAll("-", ""))+1}T053000Z&location=taskque&trp=false&sf=true`;
                window.open(url, "_blank");
            }
            showAddTask("hide");
            setTask({...task,
                content: "", priority: "Normal", duedate: getDate()
            });
          };
      
          fetchAPI();
        }
    };
        
    if(status == "show")
    return (
        <Section>
            <Container>
                <Input type="text" placeholder="Enter Your Task Todo" id="content" onChange={handleChange} />
                <Select id="priority" onChange={handleChange} value={task.priority}>
                    <option value="Normal">Normal</option>
                    <option value="Minor">Minor</option>
                    <option value="Critical">Critical</option>
                </Select>
                <Input type="date" id="duedate" value={task.duedate} onChange={handleChange} />
                <CenterDiv>
                    <input type="checkbox" onChange={(e) => setGoogle(e.target.checked)} /> Add an Event in Google Calendar
                </CenterDiv>
                <Button onClick={addTask}>Add Task</Button>
                <CenterDiv style={{cursor: "pointer", marginBottom: "0px"}} onClick={() => showAddTask("hide")}>Close</CenterDiv>
            </Container>
        </Section>
    );

    else return "";
};