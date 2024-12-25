import { useEffect, useRef } from "react";
import { useQuize } from "../contexts/useQuize";
import { ActionTypes } from "../Types/ActionType";

const Timer = () => {
  const { dispatch, points, time } = useQuize();
  const myTimer = useRef<NodeJS.Timer | null>(null);
  const mins = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  const onStop = () => {
    if (myTimer.current) {
      clearInterval(myTimer.current);
    }
  };
  useEffect(() => {
    myTimer.current = setInterval(() => {
      if (time > 0) {
        dispatch({
          type: ActionTypes.Time,
          payLoad: 1,
        });
      } else {
        dispatch({ type: ActionTypes.Status, payLoad: "finished" });
        dispatch({ type: ActionTypes.HighScore, payLoad: points });
      }
    }, 1000);

    return () => {
      onStop();
    };
  }, []);
  return (
    <div className="timer" role="button">
      {mins < 10 ? `0${mins}` : mins} : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
