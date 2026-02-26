import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Phase, Status} from "./types"

interface TimerState {
  phase: Phase
  status: Status
  secondsLeft: number
  endsAt: number | null
  lastTickAt: number | null
  elapsedThisRun: number
  cyclesCompleted: number
  totalSeconds: number
}

const initialState: TimerState = {
  phase: "focus",
  status: "idle",
  secondsLeft: 0,
  endsAt: null,
  lastTickAt: null,
  elapsedThisRun: 0,
  cyclesCompleted: 0,
  totalSeconds: 0
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setRunning: (state, action: PayloadAction<{ endsAt: number; now: number; totalSeconds: number }>) => {
      state.status = "running"
      state.endsAt = action.payload.endsAt
      state.lastTickAt = action.payload.now
      state.elapsedThisRun = 0
      state.totalSeconds = action.payload.totalSeconds;
      state.secondsLeft = action.payload.totalSeconds;
    },
    setPaused: (state) => {
      state.status = "paused"
      state.lastTickAt = null
    },
    resumeRunning: (state, action: PayloadAction<{ now: number }>) => {
      state.status = "running"
      state.endsAt = action.payload.now + state.secondsLeft * 1000
      state.lastTickAt = action.payload.now
    },
    setIdleReset: (state, action: PayloadAction<{ seconds: number; }>) => {
      state.status = "idle"
      state.secondsLeft = action.payload.seconds
      state.endsAt = null
      state.lastTickAt = null
      state.elapsedThisRun = 0
    },
    applyTick: (state, action: PayloadAction<{ now: number; }>) => {
      if (state.status !== "running") return
      if (state.endsAt === null) return 
      if (state.lastTickAt === null) {
        state.lastTickAt = action.payload.now
        return
      } else {
        const diffMs = action.payload.now - state.lastTickAt
        const diffSec = Math.floor(diffMs / 1000)
        if (diffSec > 0) {
          state.elapsedThisRun += diffSec
          state.lastTickAt = action.payload.now
        }
      }
      const msLeft = state.endsAt - action.payload.now
      const secLeft = Math.max(0, Math.ceil(msLeft / 1000))
      state.secondsLeft = secLeft
    },
    transitionToPhase: (state, action: PayloadAction<{ phase: Phase; secondsLeft: number }>) => {
      state.phase = action.payload.phase
      state.secondsLeft = action.payload.secondsLeft
      state.status = "idle"
      state.endsAt = null
      state.lastTickAt = null
      state.elapsedThisRun = 0
    },
    incrementFocusCycle: (state) => {
      state.cyclesCompleted += 1
    },
    resetCycles: (state) => {
      state.cyclesCompleted = 0;
    },
    resetSession: (state, action: PayloadAction<{ focusSeconds: number }>) => {
      state.phase = "focus";
      state.status = "idle";
      state.secondsLeft = action.payload.focusSeconds;
      state.totalSeconds = action.payload.focusSeconds;
      state.endsAt = null;
      state.lastTickAt = null;
      state.elapsedThisRun = 0;
      state.cyclesCompleted = 0;
    },
  }
})

export const { setRunning, setPaused, resumeRunning, setIdleReset, applyTick, transitionToPhase, incrementFocusCycle, resetCycles, resetSession } = timerSlice.actions
export default timerSlice.reducer