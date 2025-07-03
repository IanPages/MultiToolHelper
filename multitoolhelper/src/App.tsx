import { Link, NavLink, Route, Routes } from "react-router-dom";
import {TodoList} from "./components/TodoList";
import {NotePads} from "./components/NotePads";
import { PomodoroTimer } from "./components/PomodoroTimer";
import "./index.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow mb-4">
        <nav className="container mx-auto flex gap-4 p-4">
          <NavLink
            to="/todos"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Pomodoro
          </NavLink>
        </nav>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">Hola Tailwind 🚀</h1>
    </div>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/notes" element={<NotePads />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </main>
    </div>
  );
}