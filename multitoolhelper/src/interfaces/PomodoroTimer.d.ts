export interface PomodoroState {
    isRunning: boolean;
    isWorkTime: boolean;
    timeLeft: number;
    workDuration: number;
    breakDuration: number;
    longBreakDuration: number;
}