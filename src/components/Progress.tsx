import { useQuize } from "../contexts/useQuize"

interface ProgressProp{
    
    maxPoints:number
}
const Progress = ({maxPoints}:ProgressProp) => {
  const {index,points,answer,finnalQuestions}=useQuize()
  return (
    <header className="progress">
      <progress
        max={finnalQuestions.length}
        className="progress-t"
        value={index - 1 + Number(answer > -1)}
      />
      <p>
        Questions <strong>{index + 1}</strong> / {finnalQuestions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress