import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { tickThunk } from "../model/timerThunks";

export const useTimerTicker = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.timer.status);

  useEffect(() => {
    if (status !== "running") return;

    const id = window.setInterval(() => {
      dispatch(tickThunk());
    }, 250);

    return () => window.clearInterval(id);
  }, [status, dispatch]);
};
