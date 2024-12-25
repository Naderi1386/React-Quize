import { QusetionType } from "../Types/dataType";
import { Options } from "./Options";

interface QuestionProp {
  question: QusetionType;
}

const Question = ({ question }: QuestionProp) => {

  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        rightAnswer={question.correctOption}
        options={question.options}
      />
    </div>
  );
};

export default Question;
