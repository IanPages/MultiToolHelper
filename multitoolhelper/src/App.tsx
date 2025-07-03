import { NavLink, Route, Routes } from "react-router-dom";
import {TodoList} from "./components/TodoList";
import {NotePads} from "./components/NotePads";
import { PomodoroTimer } from "./components/PomodoroTimer";
import "./index.css";
import { Welcome } from "./components/Welcome";
import { NotFound } from "./components/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-red-200 shadow mb-4">
        <nav className="container mx-auto flex gap-4 p-4">
          <NavLink
            to="/todos"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-500"
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-500"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-700 hover:text-red-500"
            }
          >
            Pomodoro
          </NavLink>
        </nav>
        
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/todos" element={<TodoList />} />
          <Route path="/notes" element={<NotePads />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}