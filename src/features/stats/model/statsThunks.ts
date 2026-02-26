import type { AppDispatch } from "../../../app/store/store";
import { resetTodayStats } from "./statsSlice";
import { resetTasksTodaySeconds } from "../../tasks/model/tasksSlice";

export const resetTodayThunk =
  () => (dispatch: AppDispatch) => {
    dispatch(resetTodayStats());
    dispatch(resetTasksTodaySeconds());
  };