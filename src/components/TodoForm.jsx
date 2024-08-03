import { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
    //* for a single todo
    const [todo, setTodo] = useState('')
    console.log("in todoform ", todo);
    //! want to access addTodo
    const { addTodo } = useTodo();

    const add = (event) => {
        event.preventDefault();
        //* todo is ''
        if (!todo)
            return

        addTodo({ todo: todo, completed: false })
        //* after adding the todo we have to settodo to '' so that it should be blank and when we add another todo it must be taken care
        setTodo('');

    }






    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(event) => setTodo(event.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;