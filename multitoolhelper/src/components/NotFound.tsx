export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <img
            src="https://cdn-icons-png.flaticon.com/512/1978/1978026.png"
            alt="Usuario triste"
            className="w-28 mb-6"
            />
            <h2 className="text-2xl font-semibold">Página no encontrada</h2>
            <p className="text-gray-600 mt-2">Lo sentimos, no pudimos encontrar la página que buscas.</p>
            <a
            href="/"
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded font-medium text-lg hover:bg-red-700 transition"
            >
            Volver al Home
            </a>
        </div>
    )
}