import { ADD_TODO, DELETE_TODO, LOAD_TODO, UPDATE_TODO } from "./action";

const initState = {todo : []};

export const todoReducer = (store = initState, {type, payload}) => {
    switch(type) {
        case ADD_TODO:
            return {...store, todo : [...store.todo, payload]};
        case LOAD_TODO:
            return {...store, todo : [...payload]};
        case DELETE_TODO:
            return {...store, todo: store.todo.filter((el) => el.id != payload)};
        case UPDATE_TODO:
            return {...store, todo: store.todo.map((el) => {
                if(el.id == payload) el.status = "Completed";
                return el;
            })};
        default:
            return store;
    }
};