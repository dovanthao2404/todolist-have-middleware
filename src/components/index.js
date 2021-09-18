import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addTaskAPI, deleteTask, getTaskAPI, getTaskListAPI } from '../redux/actions/ToDoListActions'
export default function ToDoList(props) {

  const { taskList } = useSelector(state => state.ToDoList)
  const [taskName, setTaskName] = useState("")
  const dispatch = useDispatch()
  const getTaskList = () => {
    dispatch(getTaskListAPI())
  }

  useEffect(() => {
    getTaskList()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(addTaskAPI(taskName))
  }

  const handleOnChange = (e) => {
    const { value } = e.target
    setTaskName(value)
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


  const handleDeleteTask = async (taskName) => {
    dispatch(deleteTask(taskName))
  }

  const handleTaskDone = async (taskName) => {
    dispatch(handleTaskDone(taskName))
  }

  const handleRejectTask = async (taskName) => {
    dispatch(handleRejectTask(taskName))
  }

  return (
    <div className="container">
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
}
