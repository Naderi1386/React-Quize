export interface QusetionType {
  question: string;
  options: Array<string>;
  correctOption: number;
  points:number;
  level:string
}

export interface QuestionsType {
  questions:Array<QusetionType>;
}