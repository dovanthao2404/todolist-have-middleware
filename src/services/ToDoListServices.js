import axios from "axios"
import { DOMAIN } from "../utils/constants/settingSystem"

export class ToDoListServices {

  // getTaskApi() {

  // }
}
ToDoListServices.prototype.getTaskApi = () => {
  return axios({
    url: `${DOMAIN}/ToDoList/GetAllTask`,
    method: "GET"
  })
}

ToDoListServices.prototype.addTask = (taskName) => {
  return axios({
    url: `${DOMAIN}/ToDoList/AddTask`,
    method: "POST",
    data: { taskName }
  })
}

ToDoListServices.prototype.deleteTask = (taskName) => {
  return axios({
    url: `${DOMAIN}/ToDoList/deleteTask?taskName=${taskName}`,
    method: "DELETE"
  })
}

ToDoListServices.prototype.rejectTask = (taskName) => {
  return axios({
    url: `${DOMAIN}/ToDoList/rejectTask?taskName=${taskName}`,
    method: "PUT"
  })
}

ToDoListServices.prototype.doneTask = (taskName) => {
  return axios({
    url: `${DOMAIN}/ToDoList/doneTask?taskName=${taskName}`,
    method: "PUT"
  })
}

export const toDoListServices = new ToDoListServices()
