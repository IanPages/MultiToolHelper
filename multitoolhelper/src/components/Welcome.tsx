export const Welcome = () => {
    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-2">Bienvenido a MultiToolHelper</h1>
            <p className="text-lg text-gray-600">Tu aplicación todo-en-uno para mejorar tu productividad.</p>
            <div className="flex gap-8 mt-8">
            <div className="border border-gray-200 rounded-lg p-6 w-52 text-center shadow-sm bg-white">
                <h2 className="text-2xl font-semibold mb-2">Pomodoro</h2>
                <p className="text-gray-500">Gestiona tu tiempo y mantén el enfoque usando la técnica Pomodoro.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 w-52 text-center shadow-sm bg-white">
                <h2 className="text-2xl font-semibold mb-2">To-Do List</h2>
                <p className="text-gray-500">Organiza tus tareas diarias y mantente al día con tus pendientes.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 w-52 text-center shadow-sm bg-white">
                <h2 className="text-2xl font-semibold mb-2">Notepad</h2>
                <p className="text-gray-500">Toma notas rápidas y guarda tus ideas importantes en un solo lugar.</p>
            </div>
            </div>
        </div>
    )
}