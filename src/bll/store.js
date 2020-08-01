import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import dataReducer from "./dataReducer";

let rootReducer = combineReducers({
    reducer:dataReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
