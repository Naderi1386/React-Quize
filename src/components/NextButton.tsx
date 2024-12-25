import { useQuize } from "../contexts/useQuize";
import { ActionTypes } from "../Types/ActionType";
interface NextButtonProp {
  High:number
}
const NextButton = ({ High }: NextButtonProp) => {
  const {index,dispatch,finnalQuestions,answer}=useQuize()
  return (
    <>
      {index < finnalQuestions.length-1 ? (
        <button className="btn btn-ui" onClick={()=>{
           if (finnalQuestions[index].correctOption == answer) {
             dispatch({
               type: ActionTypes.CorrectAnswers,
               payLoad: finnalQuestions[index],
             });
           }
           dispatch({ type: ActionTypes.Index, payLoad: 1 });
           dispatch({ type: ActionTypes.ResetAnswer, payLoad: -1 });
        }}>
          Next
        </button>
      ) : (
        <button onClick={()=>{
           dispatch({
             type: ActionTypes.Status,
             payLoad: "finished",
           });
           dispatch({
             type: ActionTypes.HighScore,
             payLoad: High,
           });
        }} className="btn btn-ui">Finish</button>
      )}
    </>
  );
};

export default NextButton;


