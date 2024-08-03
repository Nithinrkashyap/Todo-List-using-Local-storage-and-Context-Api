import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem } from "./components";


function App() {

  //* default value of todos is []

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {

    //~ todo:{ todo: "Buy groceries", completed: false }

    //* we must have to set [{id,todo,completed}]-->use usestate for todods
    //~ todos is an array of objects
    //& when you are adding there might be existing todos so we must keep all previous todo info

    //!prev is an array of objects [{id:1,todo:'a',completed:false},{id:2,todo:'b',completed:false}]

    setTodos((prev) => {
      //*.  [{},{id:1,todo:'a',completed:false},{id:2,todo:'b',completed:false}]
      //? [{ id: Date.now(), todo:{ todo: "Buy groceries", completed: false }}, ...prev] it is wrong
      //~instead [{ id: Date.now(),  todo: "Buy groceries", completed: false }, ...prev] it is correct
      //^         use spreadoperator todo: "Buy groceries", completed: false means ...todo             

      return [{ id: Date.now(), ...todo }, ...prev]
      // return [...prev, { id: Date.now(), ...todo }]
    })


  }

  const updateTodo = (id, todo) => {

    setTodos((prev) => {
      return prev.map((prevTodo) => {
        return prevTodo.id === id ? todo : prevTodo;
      })
    })
  }


  const deleteTodo = (id) => {

    //*The filter() method in JavaScript is used to create a new array containing elements from the original array that satisfy a specified condition

    setTodos((prev) => {
      return prev.filter((prevTodo) => {
        return prevTodo.id != id
      })
    })


  }


  const toggleComplete = (id) => {

    setTodos((prev) => {
      return prev.map((prevTodo) => {
        return prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      })
    })


  }

  // * when the components gets mounted then it runs only once
  //^ when App.jsx components initially mounts it gets triggered
  //& when we refresh the page it runs from first and it initially mounts App.jsx
  useEffect(() => {

    console.log("1");
    const todos = JSON.parse(localStorage.getItem('todos'));
    console.log("todos in useeffect is", todos);
    if (todos && todos.length > 0) {
      console.log(11);
      setTodos(todos)
    }
  }, []);


  //~localStorage.setItem("lastname", "Smith");(string,string)
  // //* localStorage.getItem("lastname");
  useEffect(() => {
    console.log("2");

    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos])







  //* i want to access the varaibles in TodoContext.js use TodoProvider
  return (
    <>

      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>



        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (
                <div key={todo.id}
                  className='w-full'
                >
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </TodoProvider>

    </>
  )
}

export default App
