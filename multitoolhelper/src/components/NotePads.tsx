import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Notepad } from "../interfaces/Notepad"

export const NotePads = () => {

    const [notePads, setNotePads] = useLocalStorage<Notepad[]>("notepads", []);
    const [selectedPad, setSelectedPad] = useState<Notepad | null>(null);

    const [showNewForm, setShowNewForm] = useState(false);
    const [newPad, setNewPad] = useState<Notepad>({ id: 0, title: "", content: "", createdAt: new Date(), updatedAt: new Date() });

    const handleNewPadChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPad.title.trim() === "" || newPad.content.trim() === "") {
            alert("Please fill the input fields");
            return;
        }
        const notepad: Notepad ={
            id: notePads.length > 0 ? notePads[notePads.length - 1].id + 1 : 0,
            title: newPad.title,
            content: newPad.content,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        addNotePad(notepad);
        setNewPad({ id: 0, title: "", content: "", createdAt: new Date(), updatedAt: new Date() });
        setShowNewForm(false);
    }

    const addNotePad = (notepad: Notepad) => {
        setNotePads([...notePads, notepad]);
    }




    return (
        <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center  mx-auto">
            <div className="w-full max-w-md mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-0 flex items-center">NotePads</h1>
                <button className="bg-green-600 rounded p-1 text-white font-semibold flex items-center h-8 cursor-pointer hover:bg-green-700 transition duration-200"
                onClick={() => { setShowNewForm(true), setSelectedPad(null)}}>Create new notepad</button>         
            </div>
            <div className="w-full mb-4 mt-8 flex gap-2" >
                <div className="w-4/12 mx-auto mb-4 flex flex-col gap-2 p-4">
                    {notePads.map((notepad) => (
                        <div key={notepad.id} className={`rounded bg-red-300 cursor-pointer ${selectedPad?.id === notepad.id ? "ring-2 ring-yellow-500" : ""}`}
                        onClick={() => {setSelectedPad(notepad), setShowNewForm(false)}}>
                            <h2>{notepad.title}</h2>
                            <p>{notepad.title.slice(0,20)}...</p>
                            <p className="text-gray-500 text-sm">Created at: {new Date(notepad.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-500 text-sm">Updated at: {new Date(notepad.updatedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                    
                </div>
                <div className="w-8/12 mx-auto  text-black p-4 rounded">
                    {showNewForm ? (
                        <div>
                            <form onSubmit={handleNewPadChange} className="flex flex-col gap-6 bg-gray-100 p-4 rounded">
                                <input type="text" className="w-full mb-2 active:border rounded  active:border-red-200 text-xl font-semibold" placeholder="Title..." value={newPad.title} onChange={e => setNewPad({...newPad, title: e.target.value})} />
                                <textarea className="w-full h-20 rounded active:border-red-200 active:border" placeholder="Content..." value={newPad.content} onChange={e => setNewPad({...newPad, content: e.target.value})} />
                                <button className="bg-green-600 rounded text-white font-semibold hover:bg-green-700 transition duration-200 cursor-pointer">Create new notepad</button>
                            </form>
                        </div>
                    ) : selectedPad ? (
                        <div>
                        <input
                            className="w-full mb-2"
                            value={selectedPad.title}
                            onChange={e => setSelectedPad({ ...selectedPad, title: e.target.value })}
                        />
                        <textarea
                            className="w-full"
                            value={selectedPad.content}
                            onChange={e => setSelectedPad({ ...selectedPad, content: e.target.value })}
                        />
                        {/*MIRAR COMO ACTUALIZAR PARA HACERLO MEJOR PROBABLEMENTE MIRAR NUEVA FUNCION */}
                        <button
                            onClick={() => {
                            setNotePads(notePads.map(pad => pad.id === selectedPad.id ? selectedPad : pad));
                            }}
                            className="mt-2 bg-green-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-600 transition duration-200">
                            Save changes
                        </button>
                        </div>
                    ) : (
                        <p className="text-center">Select a notepad or create a new one</p>
                    )}
                </div>
            </div>
            
        </div>
    )
}
