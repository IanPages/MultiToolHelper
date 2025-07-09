import type { PomodoroState } from "./PomodoroTimer";

export interface PomodoroProps {
    onClose: () => void;
    pomodoro: PomodoroState;
    setPomodoro: (pomodoro: PomodoroState) => void;
}