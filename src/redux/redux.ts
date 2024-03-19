import { combineReducers, legacy_createStore as createStore } from "redux";
import MainReducer from "./mainReducer";

let reducers = combineReducers({
  main: MainReducer
});

type reducersType = typeof reducers;
export type AppStateType = ReturnType<reducersType>;

let store = createStore(reducers);

export default store;