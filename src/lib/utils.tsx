import { FormValues } from "@/components/interfaces/questionBoard/questionBoard.interface";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export const toQuestionBoardApiPayload = (values: FormValues) => {
    const questions = values.questions.flatMap<any>((q, idx) => {
      const groupNumber = idx + 1;

      if (q.layoutType === "PARAGRAPH") {
        let questionNumber = 1; // reset per group
        const paragraph = q.mainQuestionDescription;

        return q.subQuestions?.map((sq) => {
          const mappedOptions = sq.options.map((o) => ({
            option: o.option,
            isCorrect: sq.answer === o.option,
          }));

          const item = {
            isQuestionGroup: true,
            number: groupNumber,
            paragraph,
            question: sq.question,
            questionNumber: questionNumber++, // increases only within this group
            questionType:
              sq.questionType === "FILL_IN_THE_BLANKS"
                ? "FILL_IN_THE_BLANKS"
                : sq.questionType === "TRUE_FALSE"
                ? "TRUE_FALSE"
                : "MCQ",
            questionDescription: sq.questionDescription,
            questionTitle : q.mainQuestionTitle,     
            explanation: sq.explanation,
            options: mappedOptions,
            questionImage:
              typeof sq.image === "string"
                ? sq.image
                : (sq as any)?.image?.url ||
                  (sq as any)?.image?.uploadedImageUrl ||
                  (sq as any)?.image?.imageUrl ||
                  undefined,
            subQuestionImage: undefined,
          };
          return item;
        });
      } else {
        // Without paragraph question
        const mappedOptions = q.options.map((o) => ({
          option: o.option,
          isCorrect: q.answer === o.option,
        }));

        return [
          {
            isQuestionGroup: false,
            number: groupNumber,
            question: q.question,
            questionNumber: 1, // always start from 1 for standalone questions
            questionType:
              q.questionType === "FILL_IN_THE_BLANKS"
                ? "FILL_IN_THE_BLANKS"
                : q.questionType === "TRUE_FALSE"
                ? "TRUE_FALSE"
                : "MCQ",
            questionDescription: q.questionDescription,
            explanation: q.explanation,
            options: mappedOptions,
            questionImage:
              typeof q.image === "string"
                ? q.image
                : (q as any)?.image?.url ||
                  (q as any)?.image?.uploadedImageUrl ||
                  (q as any)?.image?.imageUrl ||
                  undefined,
            paragraph: undefined,
            subQuestionImage: undefined,
          },
        ];
      }
    });

    return {
      questionBoardTitle: values.questionBoardTitle,
      questionDescription: values.questionDescription,
      topicId: values.topic,
      type: 'live',
      subTopic: values.subTopic,
      grade: values.grade,
      subject: values.subject,
      questionBoardImgae:
        typeof values.boardImage === "string"
          ? values.boardImage
          : (values as any)?.boardImage?.url ||
            (values as any)?.boardImage?.uploadedImageUrl ||
            (values as any)?.boardImage?.imageUrl ||
            undefined,
      durationTime: values.durationTime,
      level: values.level,
      // status: values.status === "APPROVED" ? "APPROVED" : "DRAFT" as "DRAFT" | "APPROVED",
      passPacentage: Number(values.passPacentage),
      country: values.country,
      questions,
    };
  };

  export const Label = ({ children }: { children: React.ReactNode }) => {
    return <label className="block mb-2 text-sm font-medium">{children}</label>;
  };
  
  export const FieldError = ({ name, errors, touched }: any) => {
    return errors?.[name] && touched?.[name] ? (
      <p className="text-red-500 text-xs mt-1">{String(errors[name])}</p>
    ) : null;
  };
  