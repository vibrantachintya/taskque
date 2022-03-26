import {combineReducers, createStore} from "redux";
import { todoReducer } from "./Todo/reducer";
import { userReducer } from "./User/reducer";

const rootReducer = combineReducers({
    todo: todoReducer,
    user_id: userReducer
});

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());