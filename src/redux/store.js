import { applyMiddleware, combineReducers, createStore } from "redux";
import { Reducer } from "./reducers";
import thunk from "redux-thunk";

const reducer = combineReducers({ data: Reducer });
const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
