import * as Yup from "yup";


export const optionArraySchema = Yup.array()
  .of(
    Yup.object({
      option: Yup.string().trim().required("Option is required"),
      isCorrect: Yup.boolean().required(),
      id: Yup.string().required(),
    })
  )
  .min(2, "At least 2 options")
  .max(4, "Maximum 4 options");

export const questionBaseSchema = {
  question: Yup.string().trim().required("Question title is required"),
  questionType: Yup.mixed<"MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE">()
    .oneOf(["MCQ", "FILL_IN_THE_BLANKS", "TRUE_FALSE"])
    .required(),
  questionDescription: Yup.string().trim().required("Description is required"),
  explanation: Yup.string().trim().required("Explanation is required"),
  options: optionArraySchema,
  answer: Yup.string().when("questionType", (questionType, schema) => {
    return questionType && questionType[0] === "MCQ"
      ? schema.required("Choose answer is required for MCQ")
      : schema.optional();
  }),
};

export const validationSchema = Yup.object({
  questionBoardTitle: Yup.string().trim().required("Required"),
  topic: Yup.string().required("Required"),
  subTopic: Yup.string().required("Required"),
  grade: Yup.string().required("Required"),
  subject: Yup.string().required("Required"),
  durationTime: Yup.string().matches(/^\d+$/, "Must be a number").required(),
  level: Yup.mixed().oneOf(["Easy", "Medium", "Hard"]).required("Required"),
  passPacentage: Yup.number().min(0).max(100).required("Required"),
  country: Yup.string().required("Required"),
  boardImage: Yup.mixed().nullable(),
  questions: Yup.array()
    .of(
      Yup.lazy((val: any) => {
        if (val?.layoutType === "PARAGRAPH") {
          return Yup.object({
            layoutType: Yup.mixed().oneOf(["PARAGRAPH"]).required(),
            mainQuestionTitle: Yup.string().trim().required("Required"),
            mainQuestionDescription: Yup.string().trim().required("Required"),
            paragraph: Yup.string().nullable(),
            subQuestions: Yup.array()
              .of(Yup.object(questionBaseSchema))
              .min(1)
              .required(),
          });
        }
        return Yup.object({
          layoutType: Yup.mixed().oneOf(["WITHOUT_PARAGRAPH"]).required(),
          ...questionBaseSchema,
        });
      })
    )
    .min(1, "Add at least one question"),
});
