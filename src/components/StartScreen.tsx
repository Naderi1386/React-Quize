import { useState } from "react"
import { useQuize } from "../contexts/useQuize"
import { ActionTypes } from "../Types/ActionType"


const StartScreen = () => {
  const {dispatch,questions,finnalQuestions}=useQuize()
  const [select,setSelected]=useState(0)
  
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{finnalQuestions.length} questions to test your React mastery</h3>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "25px",
          marginBottom: "20px",
          fontSize: "25px",
        }}
      >
        <li
          onClick={() => {
            setSelected(1);
            const easyQuestions = questions.filter((q) => q.level == "Easy");
            dispatch({ type: ActionTypes.OnEasy, peyLoad: easyQuestions });

          }}
          className={`list-item ${select == 1 && "active-item"}`}
        >
          Easy
        </li>
        <li
          className={`list-item ${select == 2 && "active-item"}`}
          onClick={() => {
            setSelected(2);
            const hardQuestions = questions.filter((q) => q.level == "Hard");
            dispatch({ type: ActionTypes.OnHard, payLoad: hardQuestions });
          }}
        >
          Hard
        </li>
        <li
          className={`list-item ${select == 3 && "active-item"}`}
          onClick={() => {
            setSelected(3);
                        dispatch({
                          type: ActionTypes.OnAll,
                          payLoad: questions,
                        });

            
          }}
        >
          All
        </li>
      </ul>
      <button onClick={()=>{
        dispatch({ type: ActionTypes.Start, payLoad: "active" });
      }} className="btn btn-ui">
        let's Start
      </button>
    </div>
  );
}

export default StartScreen