import { combineReducers } from "redux";

import authRedecer from "./authReducer";
import postReducer from "./postReducer";
export const reducers = combineReducers({ authRedecer, postReducer });
