import React, { useState } from "react";
import type { PomodoroState } from "../interfaces/PomodoroTimer"
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { PomodoroProps } from "../interfaces/PomodoroSettings";
import { BsFillDoorClosedFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";



export const PomodoroSettings: React.FC<PomodoroProps> = ({onClose, pomodoro, setPomodoro}) => {

    const [pomodoroChange, setPomodoroChange] = useLocalStorage<PomodoroState>("pomodoro", pomodoro);

    const [workDuration, setWorkDuration] = useState(pomodoro.workDuration / 60);
    const [breakDuration, setBreakDuration] = useState(pomodoro.breakDuration / 60);
    const [longBreakDuration, setLongBreakDuration] = useState(pomodoro.longBreakDuration / 60);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        const duration = Number(value);
        if (name === "workDuration") {
            setWorkDuration(duration);
        } else if (name === "breakDuration") {
            setBreakDuration(duration);
        } else if (name === "longBreakDuration") {
            setLongBreakDuration(duration);
        }
    };

    const handleSubmitDuration = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPomodoroChange(prev => ({
            ...prev,
            workDuration: workDuration * 60,
            breakDuration: breakDuration * 60,
            longBreakDuration: longBreakDuration * 60,
            timeLeft: workDuration * 60
        }));
        setPomodoro({
            ...pomodoro,
            workDuration: workDuration * 60,
            breakDuration: breakDuration * 60,
            longBreakDuration: longBreakDuration * 60,
            timeLeft: workDuration * 60
        });
        console.log(pomodoroChange);
        onClose();
    };


    return (
        <div className="m-2 w-full relative flex flex-col max-w-xl items-center p-10 text-center bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-[60vh] rounded-2xl shadow-xl border border-gray-200">
            <h1 className="text-5xl font-bold mb-4 text-neutral-900 tracking-tight drop-shadow-sm">Pomodoro Settings</h1>
            <p className="text-xl text-gray-500 mb-10">Customize your Pomodoro timer settings.</p>
                <div className="border w-full border-neutral-200 rounded-xl p-8  text-center shadow bg-white/90  hover:shadow-lg transition duration-200 ease-in-out group focus:outline-none focus:ring-2 focus:ring-neutral-400">
                    <form className="w-full grid grid-cols-1 gap-4 p-2" onSubmit={handleSubmitDuration}>
                        <div className="flex items-center gap-2 w-full justify-between">
                          <label htmlFor="workDuration" className="font-semibold text-lg w-1/2 text-left">Work duration</label>
                          <div className="flex items-center gap-2 w-1/2 justify-end">
                            <input
                              type="number" min="5" max="60"
                              name="workDuration" id="workDuration"
                              value={workDuration} onChange={handleDurationChange}
                              className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/90 placeholder-gray-400 transition shadow-sm text-right" />
                            <span className="text-gray-400 text-base">minutes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full justify-between">
                          <label htmlFor="breakDuration" className="font-semibold text-lg w-1/2 text-left">Break duration</label>
                          <div className="flex items-center gap-2 w-1/2 justify-end">
                            <input
                              type="number" min="5" max="60"
                              name="breakDuration" id="breakDuration"
                              value={breakDuration} onChange={handleDurationChange}
                              className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-white/90 placeholder-gray-400 transition shadow-sm text-right" />
                            <span className="text-gray-400 text-base">minutes</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full justify-between">
                          <label htmlFor="longBreakDuration" className="font-semibold text-lg w-1/2 text-left">Long break duration</label>
                          <div className="flex items-center gap-2 w-1/2 justify-end">
                            <input
                              type="number" min="5" max="60"
                              name="longBreakDuration" id="longBreakDuration"
                              value={longBreakDuration} onChange={handleDurationChange}
                              className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white/90 placeholder-gray-400 transition shadow-sm text-right" />
                            <span className="text-gray-400 text-base">minutes</span>
                          </div>
                        </div>
                        <button type="submit" className="mt-4 bg-neutral-900 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-neutral-700 transition duration-200 shadow focus:outline-none focus:ring-2 focus:ring-neutral-400">Save Settings</button>
                    </form>   
                </div>
                
            <button onClick={onClose}
            className="absolute top-12 right-8 text-gray-400 hover:text-neutral-900 transition text-4xl"
            aria-label="Close settings">
            <FiX />
            </button>
        </div>
    )
}