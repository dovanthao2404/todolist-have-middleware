
import axios from "axios"
import { fork, take, takeEvery, delay, takeLatest, call, put } from "redux-saga/effects"

import { HIDE_LOADING } from "../constants/LoadingConstant";

import { GET_TASK_API, GET_TASK_LIST_API, ADD_TASK_API, DELETE_TASK_API, REJECT_TASK_API, DONE_TASK_API } from "../constants/ToDoListConstants"
import { toDoListServices } from "./../../services/ToDoListServices"
import { STATUS_CODE } from './../../utils/constants/settingSystem'


/**
    18/09/2021 Thảo viết chức năng get task
    action saga lấy danh sách task từ api
 */
function* getTaskListApiAction() {
  try {
    const { data, status } = yield call(toDoListServices.getTaskApi)
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API,
        payload: data
      })

    }
  } catch (err) {
    console.log(err)
  }
  yield put({ type: HIDE_LOADING });

}

export function* followActionGetTask() {
  yield takeLatest(GET_TASK_LIST_API, getTaskListApiAction)
}


/**
    18/09/2021 Thảo viết chức năng get task
    action saga lấy danh sách task từ api
 */

function* addTaskApiAction(action) {
  const taskName = action.action

  try {

    yield call(() => toDoListServices.addTask(taskName))
    yield getTaskListApiAction()
  } catch (err) { console.log(err) }
}

export function* followActionAddTask() {
  yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

/**
    18/09/2021 Thảo viết chức năng delete ták
    action saga lấy danh sách task từ api
 */

function* deleteTaskApiAction(action) {
  const taskName = action.action
  try {
    yield call(() => toDoListServices.deleteTask(taskName))
    yield getTaskListApiAction()
  } catch (err) { console.log(err) }
}


export function* followActionDeleteTask() {
  yield takeLatest(DELETE_TASK_API, deleteTaskApiAction)
}

/**
  18/9/2021 Thảo viết chức năng reject task
 */

function* rejectTaskApiAction(action) {
  const taskName = action.action
  try {
    yield call(() => toDoListServices.rejectTask(taskName))
    yield getTaskListApiAction()
  } catch (err) {
    console.log(err)
  }
}

export function* followActionRejectTask() {
  yield takeLatest(REJECT_TASK_API, rejectTaskApiAction)
}

function* doneTaskApiAction(action) {
  const taskName = action.action
  try {
    yield call(() => toDoListServices.doneTask(taskName))
    yield getTaskListApiAction()
  } catch (err) {
    console.log(err)
  }
}

export function* followActionDoneTask() {
  yield takeLatest(DONE_TASK_API, doneTaskApiAction)
}