import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
    width: 30%;
    padding: 20px 30px;
    background: white;
    border-radius: 15px;
    margin: 100px auto;
    text-align: ${props => props.center ? "center" : "left"};
`;

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

export const Button = styled.input`
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

export const LINK = styled(Link)`
    color: black;
    text-decoration: none;
    border-bottom: 1px solid #E0E0E0;
    border-top: 1px solid #E0E0E0;
    display: inline-block;
    margin: 30px 0px 20px;
    height: 35px;
    padding-top: 15px;
    font-size: 0.9rem;

    &:hover {
        border-bottom: 1px solid black;
        border-top: 1px solid black;
    }
`;

export const Text = styled.div`
    margin-top: 20px;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor: pointer;
`;