import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getFormattedDate } from "../../Utils/Utils";

const Section = styled.section`
    width: 35%;

    div {
        margin-top: 10px;
        line-height: 1.6rem;
    }
`;

const Container = styled.div`
    padding: 30px 30px;
    background: white;
    border-radius: 15px;
    margin-top: 30px !important;

    &:first-child {
        margin: 0px !important;
    }

`; 

const Bold = styled.div`
    font-family: "Poppins";
    font-size: 1.2rem;
    color: ${props => props.status == "Pending" ? "#F2994A" : "#27AE60"};
`;

const BoldBigger = styled.div`
    font-family: "Poppins";
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #884CB2;
`;

const Larger = styled.div`
    font-size: 1.4rem;
`;

const BoldC = styled.div`
    font-family: "Poppins";
    font-size: 1.2rem;
    color: #EB5757;
`;

const LargeNumber = styled.div`
    font-size: 2.0rem;
    margin-bottom: 10px;
    font-family: "Poppins";
`;

const Day = styled.span`
    color: #884CB2;
    background: rgba(136, 76, 178, 0.1);
    font-family: "Poppins";
    display: inline-block;
    padding: 2px 10px;
    border-radius: 5px;
`;

const DisplayFlex = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContainerInner = styled.div`
    padding: 20px;
    color: #${props => props.color};
    background: ${props => props.bg};
    border-radius: 10px;
    width: 36%;
`; 

export const TodoStats = () => {

    const { todo : tasks } = useSelector(state => state.todo);
    const navigate = useNavigate();

    const date = getFormattedDate(new Date(), "date");

    let completed = 0;
    let pending = 0;
    let critical = 0;

    tasks.forEach(el => {
        if(el.status == "Completed")
            completed++;
        else pending++;
        if(el.priority == "Critical")
            critical++;
    });

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        navigate("/signin");
    };

    return (
        <Section>
            <Container>
                <BoldBigger>Taskque</BoldBigger>
                <Larger>Keep track of your daily targets</Larger>
                <div>Goalpost tracks your goal for the day so that people can see what you are working on and get motivation from you.</div>
            </Container>
            <Container>
                <Day>{getFormattedDate(new Date(), "day")}</Day>
                <Larger>{date}</Larger>
                <div>All who have accomplished great things have had a great aim in mind. Keep yourself motivated to achieve your target for the day.</div>
                <DisplayFlex>
                    <ContainerInner color="F2994A" bg="rgba(242, 153, 74, 0.1)">
                        <LargeNumber>{pending}</LargeNumber>
                        <div>Task(s) Pending</div>
                    </ContainerInner>
                    <ContainerInner color="EB5757" bg="rgba(235, 87, 87, 0.1)">
                        <LargeNumber>{critical}</LargeNumber>
                        <div>Task(s) Critical</div>
                    </ContainerInner>
                </DisplayFlex>
            </Container>
            <Container>
                <Larger onClick={handleLogout} style={{marginTop: "0px", cursor: "pointer"}}>Logout from Taskque &#8594;</Larger>
            </Container>
        </Section>
    );
};