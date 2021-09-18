import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskAPI, deleteTask, getTaskAPI, getTaskListAPI } from '../redux/actions/ToDoListActions'

import LoadingComponent from './GlobalSetting/LoadingComponents/LoadingComponent'
import { GET_TASK_API, GET_TASK_LIST_API, ADD_TASK_API, DELETE_TASK_API, REJECT_TASK_API, DONE_TASK_API } from "./../redux/constants/ToDoListConstants"


export default function ToDoListSaga(props) {



  const { taskList } = useSelector(state => state.ToDoList)
  const { isLoading } = useSelector(state => state.Loading)
  const [taskName, setTaskName] = useState("")
  const dispatch = useDispatch()

  const getTaskList = () => {

  }


  useEffect(() => {
    // getTaskList()

    dispatch({ type: GET_TASK_LIST_API })

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (taskName !== '') {
      dispatch({ type: ADD_TASK_API, action: taskName })
    }
  }

  const handleOnChange = (e) => {
    setTaskName(e.target.value)
  }
  const handleDeleteTask = async (taskName) => {
    dispatch({ type: DELETE_TASK_API, action: taskName })

  }

  const handleTaskDone = async (taskName) => {
    dispatch({
      type: DONE_TASK_API, action: taskName
    })
  }

  const handleRejectTask = async (taskName) => {
    dispatch({
      type: REJECT_TASK_API, action: taskName
    })
  }

  const handleRenderTaskToDo = () => {
    return taskList?.filter(task => !task.status).map((task, key) => {
      return <tr key={key}>
        <td>{task.taskName}</td>
        <td>
          <button onClick={() => handleDeleteTask(task.taskName)}><i className="fa fa-trash"></i></button>
          <button onClick={() => handleTaskDone(task.taskName)}><i className="fa fa-check"></i></button>
          <button><i className="fa fa-pen"></i></button>
        </td>
      </tr>
    })
  }

  const handleRenderTaskDone = () => {
    return taskList?.filter(task => task.status).map((task, key) => {
      return <tr key={key}>
        <td>{task.taskName}</td>
        <td>
          <button onClick={() => handleDeleteTask(task.taskName)}><i className="fa fa-trash"></i></button>
          <button><i className="fa fa-check-circle"></i></button>
          <button onClick={() => handleRejectTask(task.taskName)}><i className="fa fa-undo"></i></button>
        </td>
      </tr >
    })
  }




  if (!isLoading) {
    return (
      <div className="container">
        <img src="../assets/imgLoading/loading.gif" alt="" />
        <form onSubmit={handleSubmit}>
          <div className="from-group">
            <input type="text" name="taskName" onChange={handleOnChange} />
            <button onSubmit={handleSubmit}>Add</button>
          </div>
        </form>
        <div>
          <h3>List to do</h3>
          <div>
            <table>
              <thead></thead>
              <tbody>
                {handleRenderTaskToDo()}
              </tbody>
            </table>
          </div>
          <h3>ListDone</h3>
          <div>
            <table>
              <thead></thead>
              <tbody>
                {handleRenderTaskDone()}
              </tbody>
            </table>
          </div>
        </div>
      </div >

    )
  } else {
    return <LoadingComponent />
  }
}