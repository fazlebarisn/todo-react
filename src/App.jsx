import { useState } from "react"
import "./style.css"

export default function App(){

  const [ newItem, setNewItem ] = useState('')
  const [ todos, setTodos ] = useState([])

  function handleSubmit(e){
    e.preventDefault()

    setTodos( currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, complated: false},
      ]
    })
    // empty inputbox
    setNewItem('')
  }

  function toggleTodo(id, complated){
    setTodos( currentTodos => {
      return currentTodos.map(todo => {
        if( todo.id === id ){
          return { ...todo, complated }
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos( currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            type="text" 
            value={newItem}
            onChange={ e => setNewItem(e.target.value) } 
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo list</h1>
      <ul className="list">
        {todos.length === 0 && "No Todos"}
        { todos.map( todo => {
          return (
            <li key={todo.id}>
            <label>
              <input 
                type="checkbox" 
                checked={todo.complated} 
                onChange={ e=> toggleTodo(todo.id, e.target.checked) }
              />
              {todo.title}
            </label>
            <button
              onClick={() => deleteTodo(todo.id)} 
              className="btn btn-danger">
              Delete
            </button>
          </li>
          )
        })}
      </ul>
    </>
  )
}