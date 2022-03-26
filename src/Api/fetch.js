import axios from "axios";

const url = "https://json-server-achintya.herokuapp.com/";

export const postTodo = async (todo) => {
    try {
        let res = await axios.post(`${url}todo`, todo);
        return res;
    } catch(e) {
        return e;
    }
};

export const getTodo = async (user) => {
    try {
        let res = await axios.get(`${url}todo?user_id=${user}`);
        return res;
    } catch(e) {
        return e;
    }
};

export const getSingleTodo = async (id) => {
    try {
        let res = await axios.get(`${url}todo/${id}`);
        return res;
    } catch(e) {
        return e.response.status;
    }
};

export const updateCompletedStatus = async (id) => {
    try {
        let res = await axios.patch(`${url}todo/${id}`, {status: "Completed"});
        return res;
    } catch(e) {
        return e.response.status;
    }
};

export const deleteSingleTodo = async (id) => {
    try {
        let res = await axios.delete(`${url}todo/${id}`);
        return res;
    } catch(e) {
        return e;
    }
};

export const userLoginAPI = async (email, pwd) => {
    try {
        let res = await axios.get(`${url}todo_user?email=${email}`);
        if(res.data.length > 0 && res.data[0].pwd == pwd) return res.data[0];
        return "invalid";
    } catch(e) {
        return e;
    }
};

export const userSignupAPI = async (user) => {
    try {
        let res = await axios.post(`${url}todo_user`, user);
        return res;
    } catch(e) {
        return e;
    }
};
