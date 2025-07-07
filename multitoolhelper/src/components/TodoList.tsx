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
        <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-xl rounded-2xl flex flex-col items-center max-w-3xl mx-auto border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-neutral-900 tracking-tight">Todo List</h1>
            <form onSubmit={handleCreateTodo} className="flex items-center mb-6 gap-4 w-full max-w-md">
                <input type="text" value={todo.text} onChange={handleInputChange} placeholder="Type your task..." className="bg-white/90 border border-gray-200 rounded-lg px-3 py-2 text-lg font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400 placeholder-gray-400 flex-1" />
                <button className="bg-neutral-900 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-neutral-700 transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-neutral-400">Add to the list</button>
            </form>
            {todos.length > 0 ? (
                <ul className="w-full max-w-md mx-auto">
                    {todos.filter(t => t.completed == false).map((todo) => (
                        <li key={todo.id} className="flex justify-between items-center bg-white/80 border border-gray-100 p-3 mb-2 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm">
                            <span onClick={() => toggleTodo(todo.id)} className="cursor-pointer text-neutral-900 font-medium hover:line-through transition-all">{todo.text}</span>
                            <button className="cursor-pointer text-gray-400 hover:text-red-500 text-lg font-bold px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-300 transition" onClick={() => removeTodo(todo.id)} aria-label="Delete">×</button>
                        </li>
                    ))}
                    <p className="text-center font-semibold m-2 text-gray-400">Tasks Done:</p>
                    {todos.filter(t => t.completed == true).map((todo) => (
                        <li  key={todo.id} className="flex justify-between items-center bg-gray-100 border border-gray-100 p-3 mb-2 rounded-lg hover:bg-gray-200 transition-colors line-through opacity-70">
                            <span onClick={() => toggleTodo(todo.id)} className="cursor-pointer text-gray-400">{todo.text}</span>
                            <button className="cursor-pointer text-gray-300 hover:text-red-400 text-lg font-bold px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-200 transition" onClick={() => removeTodo(todo.id)} aria-label="Delete">×</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-6 font-semibold text-gray-400">Add your first task!</p>
            )}
        </div>
    )
}
