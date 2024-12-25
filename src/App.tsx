import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import NextButton from "./components/NextButton";
import { useQuize } from "./contexts/useQuize";
import { ActionTypes } from "./Types/ActionType";

const App = () => {
  const {
    dispatch,
    finnalQuestions,
    highScore,
    points,
    answer,
    index,
    status,
  } = useQuize();
  useEffect(() => {
    const sentRequest = async () => {
      try {
        const request = await fetch("http://localhost:8000/questions");
        const response = await request.json();

        dispatch({ type: ActionTypes.Fetching, payLoad: response });
      } catch (error) {
        dispatch({ type: ActionTypes.Err, payLoad: "error" });
      }
    };
    sentRequest();
  }, [dispatch]);
  const maxPoints = finnalQuestions.reduce((result, value) => {
    return result + value.points;
  }, 0);
  const High = highScore >= points ? highScore : points;

  return (
    <div className="app">
      <Header />
      <MainComponent>
        {status == "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && <StartScreen />}
        {status == "active" && (
          <>
            <Progress maxPoints={maxPoints} />

            <Question question={finnalQuestions[index]} />
            <Footer>
              <Timer />
              {answer > -1 && <NextButton High={High} />}
            </Footer>
          </>
        )}

        {status == "finished" && (
          <FinishedScreen highScore={High} maxPoints={maxPoints} />
        )}
      </MainComponent>
    </div>
  );
};

export default App;
