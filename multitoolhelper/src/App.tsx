import { Link, NavLink, Route, Routes } from "react-router-dom";
import {TodoList} from "./components/TodoList";
import {NotePads} from "./components/NotePads";
import { PomodoroTimer } from "./components/PomodoroTimer";
import "./index.css";
import { Welcome } from "./components/Welcome";
import { NotFound } from "./components/NotFound";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-x-hidden text-gray-900">
      <img
        src="/animated-bg-waves.svg"
        alt="Animated background"
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none select-none animate-fadein"
        aria-hidden="true"
      />
      <header className="bg-white/90 shadow-lg mb-6 border-b border-gray-100 relative z-10">
        <nav className="container mx-auto flex gap-6 px-6 py-4 text-center items-center rounded-xl">
          <Link to="/" className="font-bold text-2xl tracking-tight text-neutral-900 hover:text-neutral-700 transition duration-200 drop-shadow-sm">
            MultiToolHelper
          </Link>
          <NavLink
            to="/todos"
            className={({ isActive }: { isActive: boolean }) =>
              isActive
                ? "text-neutral-900 font-semibold bg-neutral-100 px-4 py-2 rounded-lg shadow-sm"
                : "text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive
                ? "text-neutral-900 font-semibold bg-neutral-100 px-4 py-2 rounded-lg shadow-sm"
                : "text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            Notes
          </NavLink>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) =>
              isActive
                ? "text-neutral-900 font-semibold bg-neutral-100 px-4 py-2 rounded-lg shadow-sm"
                : "text-gray-500 hover:text-neutral-900 hover:bg-neutral-50 px-4 py-2 rounded-lg transition duration-200"
            }
          >
            Pomodoro
          </NavLink>
        </nav>
      </header>
      <main className="container mx-auto p-4 relative z-10">
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