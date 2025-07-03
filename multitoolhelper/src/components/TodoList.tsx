import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { TodoItem } from "../interfaces/TodoItem";

export const TodoList = () => {

    const [todos, setTodos] = useLocalStorage<TodoItem[]>("todos", []);
    const [todo, setTodo] = useState<TodoItem>({ id: 0, text: "", completed: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({ ...todo, text: e.target.value });
    };

    const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo.text.trim() === "")
            {
                alert("Please fill the input field");
                return;
            };
        const newTodo: TodoItem = {
            id: todos.length > 0 ? todos[todos.length -1].id + 1  : 0,
            text: todo.text,
            completed: false
        };
        addTodo(newTodo);
    };

    const addTodo = (todo: TodoItem) => {
        setTodos([...todos, todo]);
        //reseteamos todo despues de añadirlo
        setTodo({ id: 0, text: "", completed: false });
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id != id));
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }



    return (
        <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <form onSubmit={handleCreateTodo} className="flex items-center mb-4 gap-4">
                <input type="text" value={todo.text} onChange={handleInputChange} placeholder="Type your task..." className="bg-red-200 rounded p-2 m-2 text-black font-semibold " />
                <button className=" bg-green-600 text-white font-semibold rounded p-1 cursor-pointer ">Add to the list</button>
            </form>
            {todos.length > 0 ? (
                <ul className="w-full max-w-sm mx-auto">
                    {todos.filter(t => t.completed == false).map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded hover:bg-gray-200 transition-colors">
                            <span onClick={() => toggleTodo(todo.id)} className="cursor-pointer">{todo.text}</span>
                            <button className="cursor-pointer" onClick={() => removeTodo(todo.id)}>X</button>
                        </li>
                    )
                    )}
                    <p className="text-center font-semibold m-2">Tasks Done:</p>
                    {todos.filter(t => t.completed == true).map((todo) => (
                        <li  key={todo.id} className="flex justify-between items-center bg-gray-300 p-2 mb-2 rounded hover:bg-gray-400 transition-colors line-through">
                            <span onClick={() => toggleTodo(todo.id)} className="cursor-pointer">{todo.text}</span>
                            <button className="cursor-pointer" onClick={() => removeTodo(todo.id)}>X</button>
                        </li>
                    )
                    )}
                </ul>
            ): (
                <p className="mt-4 font-semibold">Add your first task!</p>
            )}
            
            
        </div>
    )
}
