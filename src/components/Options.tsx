import { useQuize } from "../contexts/useQuize";
import { ActionTypes } from "../Types/ActionType";

interface OptionsProp {
  options: Array<string>;
  rightAnswer: number;
}
export const Options = ({options,rightAnswer}:OptionsProp) => {
  const {dispatch,answer}=useQuize()
  return (
    <div className="options">
      {options.map((o, i) => (
        <button
          disabled={answer > -1}
          key={o}
          onClick={() => dispatch({ type: ActionTypes.Answer, payLoad: i })
}
          className={`btn btn-option ${i === answer && "answer"} ${
            answer > -1 && (i === rightAnswer ? "correct" : "wrong")
          } `}
        >
          {o}
        </button>
      ))}
    </div>
  );
};

