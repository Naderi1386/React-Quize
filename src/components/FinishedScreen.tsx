import { useQuize } from "../contexts/useQuize";
import { ActionTypes } from "../Types/ActionType";

interface FinishedScreenProp {
  maxPoints: number;
  highScore: number;
}

const FinishedScreen = ({ maxPoints, highScore }: FinishedScreenProp) => {
  const { correctAnswers, points,dispatch } = useQuize();

  const persontAge = (points * 100) / maxPoints;
  let emoj;
  if (persontAge <= 25) {
    emoj = "😓";
  } else if (persontAge > 25 && persontAge <= 50) {
    emoj = "😐";
  } else if (persontAge > 50 && persontAge <= 75) {
    emoj = "😀";
  } else if (persontAge > 75 && persontAge <= 100) {
    emoj = "🤩";
  }

  return (
    <>
      <p className="result">
        <span>{emoj}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(persontAge)})%
      </p>
      <p className="highscore">Highscore : {highScore}</p>
      <br />
      <p className="highscore">You answered these Questions 👇</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {correctAnswers.map((q, index) => (
          <div className="result" style={{ width: "100%" }}>
            Question {index + 1} : {q.question}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          dispatch({ type: ActionTypes.Restart, payLoad: "ready" });
        }}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
};

export default FinishedScreen;
