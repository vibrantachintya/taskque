import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTodo } from "../../Api/fetch";
import { loadTodo } from "../../Redux/Todo/action";
import styled from "styled-components";
import { getFormattedDate } from "../../Utils/Utils";

const Section = styled.section`
    width: 55%;
    padding: 30px 30px;
    background: white;
    border-radius: 15px;
`;

const SearchInput = styled.input`
    border: none;
    outline: 0;
    font-size: 1rem;
    font-family: "Montserrat";
    display: block;
`;

const TextContainer = styled.div`
    margin: 20px 0px 20px;
    display: flex;
    align-items: center;
`;

const BoldText = styled.span`
    font-family: "Poppins";
    font-size: 1.8rem;
`;

const ColoredText = styled.span`
    color: #F3477A;
`;

const AddTaskButton = styled.button`
    background: #884CB2;
    color: white;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    height: 30px;
    margin-left: 20px;
    cursor: pointer;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: ${props => props.status == "Completed" ? "0.6" : "1"};
`;

const Content = styled.div`
    width: 50%;
    font-size: 1.4rem;
`;

const Status = styled.div`
    font-size: 1rem;
    color: ${props => props.status == "Pending" ? "#F2994A" : "#27AE60"};
    background: ${props => props.status == "Pending" ? "#fcebdb" : "#f2faf6"};
    padding: 5px 12px;
    border-radius: 10px;
`;

const Priority = styled.div`
    font-size: 1rem;
    color: ${props => props.priority == "Normal" ? "#219653" : "#EB5757"};
`;

const Click = styled.div`
    width: 30px;
    color: black;
    background: #eee;
    border-radius: 15px;
    height: 20px;
    display: flex;
    padding-bottom: 8px;
    justify-content: center;
`;

const Item = styled.div`
    padding: 15px 0px;
    border-bottom: 1px solid #E0E0E0;

    a {
        color: black;
        text-decoration: none;
    }

    &:nth-last-child(1) {
        border: none;
    }
`;

const DueDate = styled.div`
    font-size: 0.9rem;
    margin-top: 8px;
    display: flex;
    alogn-items: center;

    img {
        margin-right: 5px;
    }
`;

export const TodoList = ({showAddTask}) => {

    let { todo : tasks } = useSelector(state => state.todo);
    tasks.sort((a, b) => b.id - a.id).sort((a, b) => b.status.localeCompare(a.status));
    
    const { user_id } = useSelector(state => state.user_id);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    if(search != "")
        tasks = tasks.filter((el) => el.content.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const fetchAPI = async () => {
            let loadedTasks = await getTodo(user_id);
            dispatch(loadTodo(loadedTasks.data));
        };
      
        if(user_id != "") fetchAPI();
    }, [user_id]);
    
    return (
        <Section>
            <SearchInput placeholder="Search for tasks.." onChange={(e) => setSearch(e.target.value)} />
            <TextContainer>
                <BoldText>You've got <ColoredText>{tasks.length} task(s)</ColoredText> todo</BoldText>
                <AddTaskButton onClick={() => showAddTask("show")}>+&nbsp;&nbsp;Add Task</AddTaskButton>
            </TextContainer>
            {
                tasks.map((el) => {
                    return (
                        <Item key={el.id}>
                            <Link to={`/todo/${el.id}`}>
                                <Div status={el.status}>
                                    <Content>
                                        <div>{el.content}</div>
                                        <DueDate><img src={`/calendar.png`} width="20px" /> {getFormattedDate(new Date(el.duedate), "date")}</DueDate>
                                    </Content>
                                    <Status status={el.status}>{el.status}</Status>
                                    <Priority priority={el.priority}>{el.priority}</Priority>
                                    <Click>...</Click>
                                </Div>
                            </Link>
                        </Item>
                    );
                })
            }
        </Section>
    )
};