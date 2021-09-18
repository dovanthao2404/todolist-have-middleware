import axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstants";

export const getTaskListAPI = () => {
  return async dispatch => {
    try {
      const resp = await axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET"
      })
      await dispatch({ type: GET_TASK_API, payload: resp.data })
    } catch (err) {
      console.log(err)
    }
  }
}

export const addTaskAPI = (taskName) => {
  return async dispatch => {
    if (taskName !== '') {
      try {
        await axios({
          url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
          method: "POST",
          data: {
            taskName
          }
        })
        // await dispatch
        await dispatch(getTaskListAPI())
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export const deleteTask = (taskName) => {
  return async dispatch => {
    try {
      await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
        method: "DELETE"
      })
      await dispatch(getTaskListAPI())

    } catch (e) { }
  }
}

export const handleTaskDone = (taskName) => {
  return async dispatch => {
    try {
      await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: "PUT"
      })
      await dispatch(getTaskListAPI())

    } catch (e) { }
  }
}

export const handleRejectTask = (taskName) => {
  return async dispatch => {
    try {
      await axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: "PUT"
      })
      await dispatch(getTaskListAPI())

    } catch (e) { }
  }
}