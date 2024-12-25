import { createContext, ReactNode } from "react";
import { useReducer } from "react";
const Sec_Per_Question = 30;
import { ActionTypes } from "../Types/ActionType";


const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: -1,
  points: 0,
  highScore: 0,
  time: 0,
  correctAnswers: [],
  finnalQuestions: [],
};
interface QType {
  question: string;
  options: Array<string>;
  correctOption: number;
  points: number;
  level: string;
}

interface ContextType {
  questions: Array<QType>;
  status: string;
  index: number;
  answer: number;
  points: number;
  highScore: number;
  time: number;
  correctAnswers: Array<QType>;
  finnalQuestions: Array<QType>;
  dispatch: React.Dispatch<ActionType>;
}
interface ActionEasy {
  type: ActionTypes.OnEasy;
  peyLoad: Array<QType>;
}
interface ActionAll {
  type: ActionTypes.OnAll;
  payLoad: Array<QType>;
}
interface ActionHard {
  type: ActionTypes.OnHard;
  payLoad: Array<QType>;
}
interface ActionErr {
  type: ActionTypes.Err;
  payLoad: string;
}
interface ActionCorrect {
  type: ActionTypes.CorrectAnswers;
  payLoad: QType;
}
interface ActionStart {
  type: ActionTypes.Start;
  payLoad: string;
}
interface ActionTime {
  type: ActionTypes.Time;
  payLoad: number;
}
interface ActionRestart {
  type: ActionTypes.Restart;
  payLoad: string;
}
interface ActionIndex {
  type: ActionTypes.Index;
  payLoad: number;
}
interface ActionHighScore {
  type: ActionTypes.HighScore;
  payLoad: number;
}
interface ActionReset {
  type: ActionTypes.ResetAnswer;
  payLoad: number;
}
interface ActionAnswer {
  type: ActionTypes.Answer;
  payLoad: number;
}
interface ActionData {
  type: ActionTypes.Fetching;
  payLoad: Array<QType>;
}
interface ActionActive {
  type: ActionTypes.Status;
  payLoad: string;
}
interface ActionPoints {
  type: ActionTypes.Points;
  payLoad: number;
}

type ActionType =
  | ActionData
  | ActionErr
  | ActionActive
  | ActionIndex
  | ActionAnswer
  | ActionPoints
  | ActionReset
  | ActionHighScore
  | ActionRestart
  | ActionTime
  | ActionStart
  | ActionCorrect
  | ActionEasy
  | ActionHard
  | ActionAll;

interface StateType {
  questions: Array<QType>;
  status: string;
  index: number;
  answer: number;
  points: number;
  highScore: number;
  time: number;
  correctAnswers: Array<QType>;
  finnalQuestions: Array<QType>;
}
const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.Fetching:
      return {
        ...state,
        questions: action.payLoad,
        status: "ready",
        finnalQuestions: action.payLoad,
      };
    case ActionTypes.OnEasy:
      return { ...state, finnalQuestions: action.peyLoad };
    case ActionTypes.OnHard:
      return { ...state, finnalQuestions: action.payLoad };
    case ActionTypes.Err:
      return { ...state, status: "error" };
    case ActionTypes.Status:
      return { ...state, status: action.payLoad };
    case ActionTypes.Index:
      return { ...state, index: state.index + action.payLoad };
    case ActionTypes.HighScore:
      return { ...state, highScore: action.payLoad };
    case ActionTypes.OnAll:
      return { ...state, finnalQuestions: action.payLoad };
    case ActionTypes.Answer: {
      const question: QType = state.finnalQuestions[state.index];

      return {
        ...state,
        answer: action.payLoad,
        points:
          question.correctOption == action.payLoad
            ? state.points + question.points
            : state.points,
      };
    }
    case ActionTypes.CorrectAnswers:
      return {
        ...state,
        correctAnswers: [...state.correctAnswers, action.payLoad],
      };
    case ActionTypes.Time:
      return { ...state, time: state.time - action.payLoad };
    case ActionTypes.Restart:
      return {
        ...state,
        status: action.payLoad,
        index: 0,
        points: 0,
        answer: -1,
        time: state.finnalQuestions.length * 30,
        correctAnswers: [],
        finnalQuestions: state.questions,
      };
    case ActionTypes.Start:
      return {
        ...state,
        status: action.payLoad,
        time: state.finnalQuestions.length * Sec_Per_Question,
      };

    case ActionTypes.ResetAnswer:
      return { ...state, answer: action.payLoad, point: 0 };
    default:
      return { ...state };
  }
};

export const QuizeProvider = createContext<ContextType | null>(null);
interface QuizeContextPropType {
  children: ReactNode;
}
const QuizeContext = ({ children }: QuizeContextPropType) => {
      const [state, dispatch] = useReducer(reducer, initialState);
        const {
          questions,
          status,
          index,
          answer,
          points,
          highScore,
          time,
          correctAnswers,
          finnalQuestions,
        } = state;


  return <QuizeProvider.Provider value={{dispatch,questions,status,index,answer,points,highScore,time,correctAnswers,finnalQuestions}}>{children}</QuizeProvider.Provider>;
};

export default QuizeContext;
