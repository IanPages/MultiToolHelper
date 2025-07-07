import { Link } from "react-router-dom"

export const Welcome = () => {
    return (
        <div className="flex flex-col items-center p-12 text-center bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[60vh] rounded-2xl shadow-xl border border-gray-200">
            <h1 className="text-5xl font-bold mb-4 text-neutral-900 tracking-tight drop-shadow-sm">Welcome to MultiToolHelper!</h1>
            <p className="text-xl text-gray-500 mb-6">Your all-in-one application to manage tasks to do.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                <Link to="/pomodoro" className="border border-neutral-200 rounded-xl p-8 w-60 text-center shadow bg-white/90 hover:scale-105 hover:shadow-lg transition duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    <h2 className="text-2xl font-semibold mb-2 text-neutral-900 group-hover:text-neutral-700 transition">Pomodoro</h2>
                    <p className="text-gray-400">Manage your time and keep the focus with our pomodoro timer.</p>
                </Link>
                <Link to="/todos" className="border border-neutral-200 rounded-xl p-8 w-60 text-center shadow bg-white/90 hover:scale-105 hover:shadow-lg transition duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    <h2 className="text-2xl font-semibold mb-2 text-neutral-900 group-hover:text-neutral-700 transition">To-Do List</h2>
                    <p className="text-gray-400">Organize your daily tasks and keep all your environment in order.</p>
                </Link>
                <Link to="/notes" className="border border-neutral-200 rounded-xl p-8 w-60 text-center shadow bg-white/90 hover:scale-105 hover:shadow-lg transition duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    <h2 className="text-2xl font-semibold mb-2 text-neutral-900 group-hover:text-neutral-700 transition">Notepad</h2>
                    <p className="text-gray-400">Take notes as easy as possible and keep your thoughts written.</p>
                </Link>
            </div>
        </div>
    )
}