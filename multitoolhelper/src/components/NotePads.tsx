import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { NotepadLabel, Notepad } from "../interfaces/Notepad";

export const NotePads = () => {

    const [notePads, setNotePads] = useLocalStorage<Notepad[]>("notepads", []);
    const [userLabels, setUserLabels] = useLocalStorage<NotepadLabel[]>("userLabels", [{ id: 0, name: "Low priority",color:"green"}, { id: 1, name: "Medium priority",color:"yellow"}, { id: 2, name: "High priority",color:"red"}])
    const [selectedPad, setSelectedPad] = useState<Notepad | null>(null);

    const [searchNotepad, setSearchNotepad] = useState("");
    const filteredNotePads = notePads.filter(n => n.title.toLowerCase().includes(searchNotepad.toLowerCase()));

    const [showNewForm, setShowNewForm] = useState(false);
    const [newPad, setNewPad] = useState<Notepad>({ id: 0, title: "", content: "", createdAt: new Date(), updatedAt: new Date(), labels: [] });

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

    const updateNotePad = (notepad: Notepad) => {
        notepad.updatedAt = new Date();
        setNotePads(notePads.map(pad => pad.id === notepad.id ? notepad : pad));
        setSelectedPad(notepad);
    }

    const deleteNotePad = (notePadId: number) => {
        if (window.confirm("Are you sure you want to delete this notepad?")) {
            setNotePads(notePads.filter(pad => pad.id !== notePadId));
            setSelectedPad(null);
            setShowNewForm(false);
        }
    }




    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-xl rounded-2xl flex flex-col items-center mx-auto border border-gray-200">
            <div className="w-full max-w-md mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-0 flex items-center text-gray-800 tracking-tight">NotePads</h1>
                <button className="bg-neutral-900 rounded-lg px-3 text-white font-semibold flex items-center h-9 cursor-pointer hover:bg-neutral-700 transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
                onClick={() => { setShowNewForm(true), setSelectedPad(null)}}>Create new notepad</button>
            </div>
            <div className="grid grid-cols-1 w-full mb-4 mt-8 md:flex gap-4">
                <div className="w-full md:w-4/12 mx-auto mb-4 flex flex-col gap-3 p-0">
                <div className="w-full max-w-md mb-4 flex items-center gap-2">
                    <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-md focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90 placeholder-gray-400"
                        placeholder="Search by title..."
                        value={searchNotepad} onChange={e => setSearchNotepad(e.target.value)}
                    />
                </div>
                    {notePads.length > 0 ? filteredNotePads.map((notepad) => (
                        <div key={notepad.id}
                        className={`flex flex-col my-2 bg-white/80 shadow border rounded-xl w-full hover:shadow-lg hover:scale-[1.03] transition duration-200 cursor-pointer ease-in-out ${selectedPad?.id === notepad.id ? "border-neutral-900 scale-[1.03] shadow-2xl bg-neutral-50" : "border-gray-200"}`}
                        onClick={() => {setSelectedPad(notepad), setShowNewForm(false)}}>
                            <div className="p-4">
                                <h5 className="mb-2 text-neutral-900 text-lg font-semibold truncate">
                                {notepad.title.slice(0, 25)}{notepad.title.length > 30 ? "..." : ""}
                                </h5>
                                <p className="text-gray-500 leading-normal font-light text-sm md:text-md truncate">
                                    {notepad.content}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-1 xl:grid-cols-2 mx-3 border-t border-gray-100 pb-3 pt-2 px-1">
                                <span className="text-xs text-gray-400 font-medium">
                                Created: {new Date(notepad.createdAt).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                Last updated: {new Date(notepad.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    )): (
                        <div className="bg-white/80 shadow border rounded-xl p-4 text-center border-gray-200">
                            <p className="text-gray-400">No saved notepads.</p>
                        </div>
                    )}
                </div>
                <div className="md:w-8/12 mx-auto text-neutral-900 p-6 rounded-xl bg-white/80 shadow border border-gray-100 min-h-[250px] flex flex-col justify-center">
                    {showNewForm ? (
                        <div>
                            <form onSubmit={handleNewPadChange} className="flex flex-col gap-6 bg-gray-50 p-6 rounded-xl w-full border border-gray-100 shadow-sm">
                                <input type="text" className="w-full mb-2 border border-gray-200 rounded-lg px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90 placeholder-gray-400" placeholder="Title..." value={newPad.title} onChange={e => setNewPad({...newPad, title: e.target.value})} />
                                <textarea className="w-full h-24 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90 placeholder-gray-400" placeholder="Content..." value={newPad.content} onChange={e => setNewPad({...newPad, content: e.target.value})} />
                                <button className="bg-neutral-900 rounded-lg text-white font-semibold hover:bg-neutral-700 transition duration-200 cursor-pointer py-2 shadow focus:outline-none focus:ring-2 focus:ring-neutral-400">Create new notepad</button>
                            </form>
                        </div>
                    ) : selectedPad ? (
                        <div>
                        <input
                            className="w-full mb-2 border border-gray-200 rounded-lg px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90 placeholder-gray-400" value={selectedPad.title}
                            onChange={e => setSelectedPad({ ...selectedPad, title: e.target.value })} />
                        <textarea
                            className="w-full h-32 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-400 bg-white/90 placeholder-gray-400" value={selectedPad.content}
                            onChange={e => setSelectedPad({ ...selectedPad, content: e.target.value })}/>
                        <div className="flex justify-between mt-4">
                            <button
                            onClick={() => updateNotePad(selectedPad)} className="mt-2 bg-neutral-900 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-neutral-700 transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-neutral-400">
                            Save changes
                            </button>
                            <button onClick={() => deleteNotePad(selectedPad.id)} className="mt-2 bg-red-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-red-700 transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-red-300">
                                Delete notepad
                            </button>
                        </div>
                        </div>
                    ) : (
                        <div className="flex flex-col text-center items-center justify-center h-full w-full">
                            <p className="text-gray-400">Select a notepad to view or edit.</p>
                            <p className="text-gray-400">Or create a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
