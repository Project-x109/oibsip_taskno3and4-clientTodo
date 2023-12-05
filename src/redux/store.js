import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
