import { createStore, combineReducers, applyMiddleware } from "redux"
import { ToDoListReducer } from "./reducers/ToDoListReducer"
import thunk from 'redux-thunk';
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./saga/rootSaga";
import { reducerLoading } from "./reducers/LoadingReducer";

const middleWareSage = createSagaMiddleware()

const reducer = combineReducers({
  ToDoList: ToDoListReducer,
  Loading: reducerLoading
})

export const store = createStore(reducer, applyMiddleware(thunk, middleWareSage))
middleWareSage.run(rootSaga)