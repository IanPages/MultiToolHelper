import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { PomodoroState } from "../interfaces/PomodoroTimer";
import { FiSettings } from "react-icons/fi";
import { PomodoroSettings } from "./PomodoroSettings";

export const PomodoroTimer = () => {

    const [pomodoro, setPomodoro] = useLocalStorage<PomodoroState>("pomodoro", {
        isRunning: false,
        isWorkTime: true,
        timeLeft: 1500,
        workDuration: 1500,
        breakDuration: 300,
        longBreakDuration: 900
    });
    const [timer, setTimer] = useState("");
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        console.log(pomodoro);
    }, []);


    const startTimer = () => {
        if (!pomodoro.isRunning) {
            setPomodoro({ ...pomodoro, isRunning: true});
        }
    };

    const pauseTimer = () => {
        if (pomodoro.isRunning) {
           setPomodoro({ ...pomodoro, isRunning: false });
        }
    }

    const resetTimer = () => {
        setPomodoro({
            ...pomodoro,
            isRunning: false,
            timeLeft: pomodoro.isWorkTime
            ? pomodoro.workDuration
            : pomodoro.isWorkTime === false && pomodoro.timeLeft === pomodoro.breakDuration
            ? pomodoro.breakDuration
            : pomodoro.longBreakDuration,
        });
    };
    

    useEffect(() => {
        if (pomodoro.isRunning && pomodoro.timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setPomodoro(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
            }, 1000);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [pomodoro.isRunning, pomodoro.timeLeft]);

    useEffect(() => {
        formatTime(pomodoro.timeLeft);
        if (pomodoro.timeLeft === 0 && pomodoro.isRunning) {
            const audio = new Audio("/alarm.wav");
            audio.play();
            if (pomodoro.isWorkTime) {
                setPomodoro({
                    ...pomodoro, isWorkTime: false, isRunning: false, timeLeft: pomodoro.breakDuration
                });
                alert("Time for a break!");
            }else {
                setPomodoro({
                    ...pomodoro, isWorkTime: true, isRunning: false, timeLeft: pomodoro.workDuration
                });
                alert("Time to work!");
            }
        }
    },[pomodoro.timeLeft, pomodoro.isRunning]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        setTimer(`${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const changePomodoroDefault = () => {
        setPomodoro({
            ...pomodoro,
            workDuration: pomodoro.workDuration,
            breakDuration: pomodoro.breakDuration,
            longBreakDuration: pomodoro.longBreakDuration,
            timeLeft: pomodoro.workDuration,
            isWorkTime: true,
            isRunning: false
        })
    }

    const changeShortBreakDefault = () => {
        setPomodoro({
            ...pomodoro,
            workDuration: pomodoro.workDuration,
            breakDuration: pomodoro.breakDuration,
            longBreakDuration: pomodoro.longBreakDuration,
            timeLeft: pomodoro.breakDuration,
            isWorkTime: false,
            isRunning: false
        });
    }

    const changeLongBreakDefault = () => {
        setPomodoro({
            ...pomodoro,
            workDuration: pomodoro.workDuration,
            breakDuration: pomodoro.breakDuration,
            longBreakDuration: pomodoro.longBreakDuration,
            timeLeft: pomodoro.longBreakDuration,
            isWorkTime: false,
            isRunning: false
        });
    }

    return (
        <div className="max-w-xl relative mx-auto p-8 bg-white/90 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-8 min-h-[400px]">            
                <h1 className="text-3xl font-bold text-neutral-900 mb-2 tracking-tight">Pomodoro Timer</h1>
                <button onClick={() => setShowSettings(true)} 
                className="absolute top-10 right-10 text-gray-400 hover:text-neutral-900 transition text-2xl">
                 <FiSettings />
                </button>
           
            
            <div className="flex flex-col items-center gap-4 w-full">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-red-200 via-blue-100 to-purple-300 flex items-center justify-center shadow-inner border-4 border-white/60 mb-2">
                    <span className="text-5xl font-mono text-neutral-900 select-none">{timer}</span>
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <button onClick={startTimer} className="bg-neutral-900 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-neutral-700 transition focus:outline-none focus:ring-2 focus:ring-neutral-400">Start</button>
                    <button onClick={pauseTimer} className="bg-gray-200 cursor-pointer text-neutral-700 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-300">Pause</button>
                    <button onClick={resetTimer} className="bg-pink-500 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-pink-600 transition focus:outline-none focus:ring-2 focus:ring-pink-300">Reset</button>
                </div>
            </div>
            <div className="flex gap-4 mt-6 w-full justify-center">
                <button onClick={changePomodoroDefault} className="cursor-pointer bg-blue-100 text-blue-700 px-4 py-1 rounded-lg font-medium hover:bg-blue-200 transition">Pomodoro</button>
                <button onClick={changeShortBreakDefault} className="cursor-pointer bg-yellow-100 text-yellow-700 px-4 py-1 rounded-lg font-medium hover:bg-yellow-200 transition">Short Break</button>
                <button onClick={changeLongBreakDefault} className="cursor-pointer bg-pink-100 text-pink-700 px-4 py-1 rounded-lg font-medium hover:bg-pink-200 transition">Long Break</button>
            </div>

            {showSettings && (
                <div className="modal-overlay bg-gray-900/50 fixed inset-0 flex items-center justify-center z-50">
                    <PomodoroSettings pomodoro={pomodoro} setPomodoro={setPomodoro} onClose={() => setShowSettings(false)} />
                    
                </div>
            )}
        </div>
    )
}
