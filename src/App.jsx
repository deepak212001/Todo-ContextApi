import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
    // setTodos(todo)  
    // karte to prev array ko clean kar deta aur naya todos add kar deta 
    // par hame add karna hai to useState count wala syntaxs 
    // ...prev means sare prev object aur ye new wala

    // [...prev, { id: Date.now(), ...todo }], means object hai to object de rhe heia aur object me id aur jo todo aaya hai vo de rhe hai vo bhi ek object hai to  object spread operator kar rhe hai ki sari value aa jaye jo bhi es me hai 
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
    // { ...prevTodo, completed: !prevTodo.completed } means prevtodo ek object hai jisme id , todo , aur completed ka data hai 
    //  ab usko spread kar rhe hai to object ke data aa gya ab completed ko change kar rhe hai 
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    //ye stringify json se string me convert karta ahi 
    // ye local me string type me store hota hai 
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      <div className="flex flex-col min-h-[87.8vh] ">
        <Navbar/>
        <div className="md:w-[50%]  md:container md:mx-auto  rounded-3xl min-h-[87.5] mt-10">
          <div className="bg-blue-400 rounded-3xl w-full max-w-2xl mx-auto shadow-md  text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2 pt-5">Manage Your Todos</h1>
            <div className="mb-4 px-4 py-3">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-col gap-y-3 rounded-3xl bg-white mt-5 p-5 py-8 w-full">
              {/*Loop and Add TodoItem here */}
              <h2 className="text-lg font-bold  text-center text-black">Your-Task</h2>
              {todos.length === 0 && <div className="text-center text-black">No Task to display </div>}
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </TodoProvider >
  )
}

export default App
