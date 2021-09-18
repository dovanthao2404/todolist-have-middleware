import { all } from "redux-saga/effects"
import * as ToDoListSaga from "./ToDoListSaga"
export function* rootSaga() {
  yield all([
    ToDoListSaga.followActionGetTask(),
    ToDoListSaga.followActionAddTask(),
    ToDoListSaga.followActionDeleteTask(),
    ToDoListSaga.followActionRejectTask(),
    ToDoListSaga.followActionDoneTask()
  ])
}