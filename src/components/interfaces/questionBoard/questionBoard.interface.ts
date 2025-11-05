export  interface Option {
  id: string;
  option: string;
  isCorrect: boolean;
}

export  interface QuestionBase {
  question: string;
  questionType: "MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE";
  questionDescription: string;
  explanation: string;
  options: Option[];
  answer?: string; // value equals an option text; used to toggle isCorrect
  image?: any;
}

export  interface WithoutParagraphQuestion extends QuestionBase {
  layoutType: "WITHOUT_PARAGRAPH";
}

export  interface ParagraphSubQuestion extends QuestionBase {}

export  interface ParagraphQuestion {
  layoutType: "PARAGRAPH";
  mainQuestionTitle: string;
  mainQuestionDescription: string;
  paragraph?: string; // alias for API
  subQuestions: ParagraphSubQuestion[];
}

type Question = WithoutParagraphQuestion | ParagraphQuestion;

export  interface FormValues {
  questionBoardTitle: string;
  questionDescription?: string;
  topic?: string; // topicId
topicId?: string
  subTopic: string; // subTopicId
  grade: string; // gradeId
  subject: string; // subject name
  durationTime: string;
  level: "Easy" | "Medium" | "Hard" | "";
  passPacentage: number | "";
  country: string;
  boardImage?: any;
  status?: "DRAFT" | "APPROVED";
  questions: Question[];
}
