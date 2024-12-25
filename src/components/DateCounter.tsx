import React, { useReducer } from "react";

enum CountActionKind {
  dec = "dec",
  inc = "inc",
  defineCount = "defineCount",
  step='step',
  reset='reset'
}

// An interface for our actions
interface CountAction {
  type: CountActionKind;
  payload: number;
}
interface StateType{
  count:number
  step:number
}
const rudecer=(state:StateType,action:CountAction)=>{
  switch(action.type){
    case CountActionKind.dec:
      return {...state,count:state.count+state.step}
    case CountActionKind.inc:
      return {...state,count:state.count+state.step}
    case CountActionKind.defineCount:
      return {...state,count:action.payload} 
    case CountActionKind.step:
      return {...state,step:action.payload}  
    case CountActionKind.reset:
      return {count:action.payload,step:action.payload+1 }  
  }
  

}

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialState={count:0,step:1}
  const [state,dispatch]=useReducer(rudecer,initialState)
  const {count,step}=state
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:CountActionKind.dec,payload:-1})

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({type:CountActionKind.inc,payload:1})
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e:React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: CountActionKind.defineCount,
      payload: Number(e.target.value),
    });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e:React.ChangeEvent<HTMLInputElement>) {
    // setStep(Number(e.target.value));
    dispatch({type:CountActionKind.step,payload:Number(e.target.value)})
    
  };

  const reset = function () {
    dispatch({type:CountActionKind.reset,payload:0})
    
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
