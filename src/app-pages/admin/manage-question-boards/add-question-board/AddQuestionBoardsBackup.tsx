// // "use client";

// // import React, { Fragment } from "react";
// // import { Formik, Form, FieldArray } from "formik";
// // import * as Yup from "yup";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { CustomButton } from "@/components/ui/common/CustomButton";
// // import { Copy, Plus, Trash2 } from "lucide-react";
// // import { FormFileUpload } from "@/components/ui/common/CustomImageUpload";
// // import { cn } from "@/lib/utils";

// // type Option = { id: string; option: string; isCorrect: boolean };

// // type QuestionBase = {
// //   question: string;
// //   questionType: "MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE";
// //   questionDescription: string;
// //   explanation: string;
// //   options: Option[];
// //   answer?: string; // value equals an option text; used to toggle isCorrect
// //   image?: any;
// // };

// // type WithoutParagraphQuestion = QuestionBase & {
// //   layoutType: "WITHOUT_PARAGRAPH";
// // };

// // type ParagraphSubQuestion = QuestionBase;

// // type ParagraphQuestion = {
// //   layoutType: "PARAGRAPH";
// //   mainQuestionTitle: string;
// //   mainQuestionDescription: string;
// //   paragraph?: string; // alias for API
// //   subQuestions: ParagraphSubQuestion[];
// // };

// // type Question = WithoutParagraphQuestion | ParagraphQuestion;

// // type FormValues = {
// //   questionBoardTitle: string;
// //   topic: string;
// //   subTopic: string;
// //   grade: string;
// //   subject: string;
// //   durationTime: string;
// //   level: "Easy" | "Medium" | "Hard" | "";
// //   passPacentage: number | "";
// //   country: string;
// //   boardImage?: any;
// //   status: "DRAFT" | "APPROVED";
// //   questions: Question[];
// // };

// // // Mock data (replace with API hooks later)
// // const TOPICS: Record<string, string[]> = {
// //   Mathematics: ["Addition", "Subtraction", "Multiplication"],
// //   Science: ["Physics", "Chemistry", "Biology"],
// // };

// // const GRADES = [
// //   { id: "68ef750a9ddbbbf949f27982", label: "Grade 5" },
// //   { id: "68ef750a9ddbbbf949f27983", label: "Grade 6" },
// // ];

// // const SUBJECTS_BY_GRADE: Record<string, string[]> = {
// //   "68ef750a9ddbbbf949f27982": ["Mathematics", "Science"],
// //   "68ef750a9ddbbbf949f27983": ["Mathematics", "Geography"],
// // };

// // const baseOptions = (): Option[] => [
// //   { id: crypto.randomUUID(), option: "", isCorrect: false },
// //   { id: crypto.randomUUID(), option: "", isCorrect: false },
// // ];

// // const emptyWithoutParagraph = (): WithoutParagraphQuestion => ({
// //   layoutType: "WITHOUT_PARAGRAPH",
// //   question: "",
// //   questionType: "MCQ",
// //   questionDescription: "",
// //   explanation: "",
// //   options: baseOptions(),
// //   answer: undefined,
// //   image: undefined,
// // });

// // const emptyParagraph = (): ParagraphQuestion => ({
// //   layoutType: "PARAGRAPH",
// //   mainQuestionTitle: "",
// //   mainQuestionDescription: "",
// //   paragraph: "",
// //   subQuestions: [
// //     {
// //       question: "",
// //       questionType: "MCQ",
// //       questionDescription: "",
// //       explanation: "",
// //       options: baseOptions(),
// //       answer: undefined,
// //       image: undefined,
// //     },
// //   ],
// // });

// // const optionArraySchema = Yup.array()
// //   .of(
// //     Yup.object({
// //       option: Yup.string().trim().required("Option is required"),
// //       isCorrect: Yup.boolean().required(),
// //       id: Yup.string().required(),
// //     })
// //   )
// //   .min(2, "At least 2 options")
// //   .max(4, "Maximum 4 options");

// // const questionBaseSchema = {
// //   question: Yup.string().trim().required("Question title is required"),
// //   questionType: Yup.mixed<"MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE">()
// //     .oneOf(["MCQ", "FILL_IN_THE_BLANKS", "TRUE_FALSE"]).required(),
// //   questionDescription: Yup.string().trim().required("Description is required"),
// //   explanation: Yup.string().trim().required("Explanation is required"),
// //   options: optionArraySchema,
// //   answer: Yup.string().when("questionType", (questionType, schema) => {
// //     return questionType && questionType[0] === "MCQ"
// //       ? schema.required("Choose answer is required for MCQ")
// //       : schema.optional();
// //   }),
// // };

// // const validationSchema = Yup.object({
// //   questionBoardTitle: Yup.string().trim().required("Required"),
// //   topic: Yup.string().required("Required"),
// //   subTopic: Yup.string().required("Required"),
// //   grade: Yup.string().required("Required"),
// //   subject: Yup.string().required("Required"),
// //   durationTime: Yup.string().matches(/^\d+$/, "Must be a number").required(),
// //   level: Yup.mixed().oneOf(["Easy", "Medium", "Hard"]).required("Required"),
// //   passPacentage: Yup.number().min(0).max(100).required("Required"),
// //   country: Yup.string().required("Required"),
// //   boardImage: Yup.mixed().nullable(),
// //   questions: Yup.array()
// //     .of(
// //       Yup.lazy((val: any) => {
// //         if (val?.layoutType === "PARAGRAPH") {
// //           return Yup.object({
// //             layoutType: Yup.mixed().oneOf(["PARAGRAPH"]).required(),
// //             mainQuestionTitle: Yup.string().trim().required("Required"),
// //             mainQuestionDescription: Yup.string().trim().required("Required"),
// //             paragraph: Yup.string().nullable(),
// //             subQuestions: Yup.array()
// //               .of(Yup.object(questionBaseSchema))
// //               .min(1)
// //               .required(),
// //           });
// //         }
// //         return Yup.object({
// //           layoutType: Yup.mixed().oneOf(["WITHOUT_PARAGRAPH"]).required(),
// //           ...questionBaseSchema,
// //         });
// //       })
// //     )
// //     .min(1, "Add at least one question"),
// // });

// // const initialValues: FormValues = {
// //   questionBoardTitle: "",
// //   topic: "",
// //   subTopic: "",
// //   grade: "",
// //   subject: "",
// //   durationTime: "30",
// //   level: "",
// //   passPacentage: 40,
// //   country: "India",
// //   boardImage: undefined,
// //   status: "DRAFT",
// //   questions: [emptyWithoutParagraph()],
// // };

// // function Label({ children }: { children: React.ReactNode }) {
// //   return <label className="block mb-2 text-sm font-medium">{children}</label>;
// // }

// // function FieldError({ name, errors, touched }: any) {
// //   return errors?.[name] && touched?.[name] ? (
// //     <p className="text-red-500 text-xs mt-1">{String(errors[name])}</p>
// //   ) : null;
// // }

// // function AddQuestionBoards() {
// //   const toApiPayload = (values: FormValues) => {
// //     let questionNumber = 1;
// //     const questions = values.questions.flatMap((q, idx) => {
// //       if (q.layoutType === "PARAGRAPH") {
// //         const groupNumber = idx + 1;
// //         const paragraph = q.mainQuestionDescription;
// //         return q.subQuestions?.map((sq, sIdx) => {
// //           const mappedOptions = sq.options.map((o) => ({
// //             option: o.option,
// //             isCorrect: sq.answer === o.option,
// //           }));
// //           const item = {
// //             isQuestionGroup: true,
// //             number: groupNumber,
// //             paragraph,
// //             question: sq.question,
// //             questionNumber: questionNumber++,
// //             questionType: sq.questionType === "FILL_IN_THE_BLANKS" ? "FILL_IN_THE_BLANKS" : sq.questionType === "TRUE_FALSE" ? "TRUE_FALSE" : "MCQ",
// //             questionDescription: sq.questionDescription,
// //             explanation: sq.explanation,
// //             options: mappedOptions,
// //             // include sub question image when available
// //             subQuestionImage:
// //               typeof sq.image === "string"
// //                 ? sq.image
// //                 : (sq as any)?.image?.url || (sq as any)?.image?.uploadedImageUrl || (sq as any)?.image?.imageUrl || undefined,
// //           };
// //           return item;
// //         });
// //       } else {
// //         const mappedOptions = q.options.map((o) => ({
// //           option: o.option,
// //           isCorrect: q.answer === o.option,
// //         }));
// //         return [
// //           {
// //             isQuestionGroup: false,
// //             number: idx + 1,
// //             question: q.question,
// //             questionNumber: questionNumber++,
// //             questionType: q.questionType === "FILL_IN_THE_BLANKS" ? "FILL_IN_THE_BLANKS" : q.questionType === "TRUE_FALSE" ? "TRUE_FALSE" : "MCQ",
// //             questionDescription: q.questionDescription,
// //             explanation: q.explanation,
// //             options: mappedOptions,
// //             // include main question image when available
// //             questionImage:
// //               typeof q.image === "string"
// //                 ? q.image
// //                 : (q as any)?.image?.url || (q as any)?.image?.uploadedImageUrl || (q as any)?.image?.imageUrl || undefined,
// //           },
// //         ];
// //       }
// //     });

// //     return {
// //       questionBoardTitle: values.questionBoardTitle,
// //       topic: values.topic,
// //       subTopic: values.subTopic,
// //       grade: values.grade,
// //       durationTime: values.durationTime,
// //       level: values.level,
// //       status: values.status === "APPROVED" ? "APPROVED" : "DRAFT",
// //       passPacentage: Number(values.passPacentage),
// //       country: values.country,
// //       // include board image under API expected key
// //       questionBoardImage:
// //         typeof values.boardImage === "string"
// //           ? values.boardImage
// //           : (values as any)?.boardImage?.url || (values as any)?.boardImage?.uploadedImageUrl || (values as any)?.boardImage?.imageUrl || undefined,
// //       questions,
// //     };
// //   };

// //   return (
// //     <div className="bg-white rounded-[14px] p-6">
// //       <Formik
// //         initialValues={initialValues}
// //         validationSchema={validationSchema}
// //         onSubmit={(vals) => {
// //           const payload = toApiPayload(vals);
// //           // replace with mutation
// //           // eslint-disable-next-line no-console
// //           console.log("QB Payload", payload);
// //         }}
// //       >
// //         {({ values, errors, touched, setFieldValue }) => {
// //           const subTopics = values.topic ? TOPICS[values.topic] ?? [] : [];
// //           const subjects = values.grade
// //             ? SUBJECTS_BY_GRADE[values.grade] ?? []
// //             : [];

// //           return (
// //             <Form className="space-y-6">
// //               <div className="flex items-center justify-end gap-3">
// //                 <CustomButton
// //                   type="submit"
// //                   label="Save as Draft"
// //                   className="h-10 px-6"
// //                   onClick={() => setFieldValue("status", "DRAFT")}
// //                 />
// //                 <CustomButton
// //                   type="submit"
// //                   label="Request to Publish"
// //                   className="h-10 px-6 bg-emerald-600 hover:bg-emerald-700"
// //                   onClick={() => setFieldValue("status", "APPROVED")}
// //                 />
// //                 <CustomButton
// //                   type="button"
// //                   label="Upload CSV"
// //                   className="h-10 px-6 bg-slate-800 hover:bg-slate-900"
// //                   onClick={() => {}}
// //                 />
// //               </div>

// //               {/* Board meta */}
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 <div className="lg:col-span-2">
// //                   <Label>Question Board Title</Label>
// //                   <Input
// //                     placeholder="Question Board Title"
// //                     value={values.questionBoardTitle}
// //                     onChange={(e) =>
// //                       setFieldValue("questionBoardTitle", e.target.value)
// //                     }
// //                   />
// //                   <FieldError name="questionBoardTitle" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <FormFileUpload
// //                     name="boardImage"
// //                     label="Upload Image*"
// //                     accept="image/*"
// //                     type="image"
// //                     className=""
// //                   />
// //                 </div>

// //                 <div>
// //                   <Label>Question Description</Label>
// //                   <Textarea
// //                     placeholder="Question Description"
// //                     value={(values as any).questionDescription || ""}
// //                     onChange={(e) =>
// //                       setFieldValue("questionDescription", e.target.value)
// //                     }
// //                   />
// //                 </div>

// //                 <div>
// //                   <Label>Topic</Label>
// //                   <Select
// //                     value={values.topic}
// //                     onValueChange={(v) => {
// //                       setFieldValue("topic", v);
// //                       setFieldValue("subTopic", "");
// //                     }}
// //                   >
// //                     <SelectTrigger className="w-full">
// //                       <SelectValue placeholder="Topic" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {Object.keys(TOPICS).map((t) => (
// //                         <SelectItem key={t} value={t}>
// //                           {t}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                   <FieldError name="topic" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <Label>Subtopic</Label>
// //                   <Select
// //                     value={values.subTopic}
// //                     onValueChange={(v) => setFieldValue("subTopic", v)}
// //                   >
// //                     <SelectTrigger className="w-full">
// //                       <SelectValue placeholder="Subtopic" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {subTopics.map((s) => (
// //                         <SelectItem key={s} value={s}>
// //                           {s}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                   <FieldError name="subTopic" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <Label>Grade</Label>
// //                   <Select
// //                     value={values.grade}
// //                     onValueChange={(v) => {
// //                       setFieldValue("grade", v);
// //                       setFieldValue("subject", "");
// //                     }}
// //                   >
// //                     <SelectTrigger className="w-full">
// //                       <SelectValue placeholder="Grade" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {GRADES.map((g) => (
// //                         <SelectItem key={g.id} value={g.id}>
// //                           {g.label}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                   <FieldError name="grade" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <Label>Subject</Label>
// //                   <Select
// //                     value={values.subject}
// //                     onValueChange={(v) => setFieldValue("subject", v)}
// //                   >
// //                     <SelectTrigger className="w-full">
// //                       <SelectValue placeholder="Subject" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {subjects.map((s) => (
// //                         <SelectItem key={s} value={s}>
// //                           {s}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                   <FieldError name="subject" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <Label>Duration in Minutes</Label>
// //                   <Input
// //                     type="number"
// //                     placeholder="30"
// //                     value={values.durationTime}
// //                     onChange={(e) => setFieldValue("durationTime", e.target.value)}
// //                   />
// //                   <FieldError name="durationTime" errors={errors} touched={touched} />
// //                 </div>

// //                 <div>
// //                   <Label>Level</Label>
// //                   <Select
// //                     value={values.level}
// //                     onValueChange={(v) => setFieldValue("level", v)}
// //                   >
// //                     <SelectTrigger className="w-full">
// //                       <SelectValue placeholder="Level" />
// //                     </SelectTrigger>
// //                     <SelectContent>
// //                       {(["Easy", "Medium", "Hard"] as const).map((lvl) => (
// //                         <SelectItem key={lvl} value={lvl}>
// //                           {lvl}
// //                         </SelectItem>
// //                       ))}
// //                     </SelectContent>
// //                   </Select>
// //                   <FieldError name="level" errors={errors} touched={touched} />
// //                 </div>

// //                 <div className="lg:col-span-2">
// //                   <Label>Pass Percentage</Label>
// //                   <Input
// //                     type="number"
// //                     placeholder="40"
// //                     value={values.passPacentage}
// //                     onChange={(e) =>
// //                       setFieldValue("passPacentage", Number(e.target.value))
// //                     }
// //                   />
// //                   <FieldError name="passPacentage" errors={errors} touched={touched} />
// //                 </div>
// //               </div>

// //               {/* Questions */}
// //               <FieldArray name="questions">
// //                 {({ remove, push, insert }) => (
// //                   <div className="space-y-8">
// //                     {values.questions.map((q, qIdx) => (
// //                       <div
// //                         key={qIdx}
// //                         className="rounded-2xl border p-5 bg-[#F1FBF8]"
// //                       >
// //                         <div className="flex items-center justify-between mb-4">
// //                           <h3 className="text-lg font-semibold">Q. {qIdx + 1}</h3>
// //                           <div className="flex items-center gap-2">
// //                             <Select
// //                               value={q.layoutType}
// //                               onValueChange={(v: any) =>
// //                                 setFieldValue(`questions.${qIdx}.layoutType`, v)
// //                               }
// //                             >
// //                               <SelectTrigger className="w-[240px]">
// //                                 <SelectValue placeholder="Question Layout Type" />
// //                               </SelectTrigger>
// //                               <SelectContent>
// //                                 <SelectItem value="WITHOUT_PARAGRAPH">
// //                                   Without Paragraph
// //                                 </SelectItem>
// //                                 <SelectItem value="PARAGRAPH">Paragraph type</SelectItem>
// //                               </SelectContent>
// //                             </Select>

// //                             <button
// //                               type="button"
// //                               onClick={() => insert(qIdx + 1, JSON.parse(JSON.stringify(q)))}
// //                               className="p-2 rounded-md border bg-white"
// //                               title="Copy"
// //                             >
// //                               <Copy className="w-4 h-4" />
// //                             </button>
// //                             <button
// //                               type="button"
// //                               onClick={() => remove(qIdx)}
// //                               className="p-2 rounded-md border bg-white"
// //                               title="Delete"
// //                             >
// //                               <Trash2 className="w-4 h-4 text-red-500" />
// //                             </button>
// //                           </div>
// //                         </div>

// //                         {q.layoutType === "WITHOUT_PARAGRAPH" ? (
// //                           <QuestionFields
// //                             basePath={`questions.${qIdx}`}
// //                             values={values}
// //                             errors={errors}
// //                             touched={touched}
// //                             setFieldValue={setFieldValue}
// //                           />
// //                         ) : (
// //                           <div className="space-y-5">
// //                             <div>
// //                               <Label>Main Question Title</Label>
// //                               <Input
// //                                 placeholder="Main Question Title"
// //                                 value={(q as ParagraphQuestion).mainQuestionTitle}
// //                                 onChange={(e) =>
// //                                   setFieldValue(
// //                                     `questions.${qIdx}.mainQuestionTitle`,
// //                                     e.target.value
// //                                   )
// //                                 }
// //                               />
// //                             </div>
// //                             <div>
// //                               <Label>Main Question Description</Label>
// //                               <Textarea
// //                                 placeholder="Main Question Description"
// //                                 value={(q as ParagraphQuestion).mainQuestionDescription}
// //                                 onChange={(e) =>
// //                                   setFieldValue(
// //                                     `questions.${qIdx}.mainQuestionDescription`,
// //                                     e.target.value
// //                                   )
// //                                 }
// //                               />
// //                             </div>

// //                             <FieldArray name={`questions.${qIdx}.subQuestions`}>
// //                               {({ remove: removeSub, push: pushSub, insert: insertSub }) => (
// //                                 <div className="space-y-5">
// //                                   <div className="flex items-center justify-between">
// //                                     <h4 className="font-semibold">Sub Questions</h4>
// //                                     <CustomButton
// //                                       type="button"
// //                                       className="h-10 px-6"
// //                                       label="Add Sub Question"
// //                                       startIcon={<Plus />}
// //                                       onClick={() =>
// //                                         pushSub({
// //                                           question: "",
// //                                           questionType: "MCQ",
// //                                           questionDescription: "",
// //                                           explanation: "",
// //                                           options: baseOptions(),
// //                                           answer: undefined,
// //                                           image: undefined,
// //                                         })
// //                                       }
// //                                     />
// //                                   </div>

// //                                   {(q as ParagraphQuestion)?.subQuestions?.map((_, sIdx) => (
// //                                     <div key={sIdx} className="rounded-xl border p-4 bg-white">
// //                                       <div className="flex items-center justify-between mb-3">
// //                                         <span className="font-medium">Sub Q. {sIdx + 1}</span>
// //                                         <div className="flex gap-2">
// //                                           <button
// //                                             type="button"
// //                                             onClick={() =>
// //                                               insertSub(
// //                                                 sIdx + 1,
// //                                                 JSON.parse(
// //                                                   JSON.stringify(
// //                                                     (q as ParagraphQuestion).subQuestions[sIdx]
// //                                                   )
// //                                                 )
// //                                               )
// //                                             }
// //                                             className="p-2 rounded-md border bg-white"
// //                                             title="Copy"
// //                                           >
// //                                             <Copy className="w-4 h-4" />
// //                                           </button>
// //                                           <button
// //                                             type="button"
// //                                             onClick={() => removeSub(sIdx)}
// //                                             className="p-2 rounded-md border bg-white"
// //                                             title="Delete"
// //                                           >
// //                                             <Trash2 className="w-4 h-4 text-red-500" />
// //                                           </button>
// //                                         </div>
// //                                       </div>

// //                                       <QuestionFields
// //                                         basePath={`questions.${qIdx}.subQuestions.${sIdx}`}
// //                                         values={values}
// //                                         errors={errors}
// //                                         touched={touched}
// //                                         setFieldValue={setFieldValue}
// //                                       />
// //                                     </div>
// //                                   ))}
// //                                 </div>
// //                               )}
// //                             </FieldArray>
// //                           </div>
// //                         )}
// //                       </div>
// //                     ))}

// //                     <div className="flex justify-center">
// //                       <CustomButton
// //                         type="button"
// //                         label="Add Question"
// //                         startIcon={<Plus />}
// //                         className="px-8"
// //                         onClick={() => push(emptyWithoutParagraph())}
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //               </FieldArray>
// //             </Form>
// //           );
// //         }}
// //       </Formik>
// //     </div>
// //   );
// // }

// // function QuestionFields({
// //   basePath,
// //   values,
// //   errors,
// //   touched,
// //   setFieldValue,
// // }: any) {
// //   const q = basePath
// //     .split(".")
// //     .reduce((acc: any, key: string) => acc?.[key], values);

// //   const name = (suffix: string) => `${basePath}.${suffix}`;

// //   const canAdd = (q.options?.length ?? 0) < 4;
// //   const canRemove = (q.options?.length ?? 0) > 2;

// //   const onAnswerChange = (val: string) => {
// //     setFieldValue(name("answer"), val);
// //     // toggle flags for clarity in JSON mapping later
// //     const next = q.options.map((o: Option) => ({ ...o, isCorrect: o.option === val }));
// //     setFieldValue(name("options"), next);
// //   };

// //   return (
// //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //       <div>
// //         <Label>Question Title</Label>
// //         <Input
// //           placeholder="Question Board Title"
// //           value={q.question}
// //           onChange={(e) => setFieldValue(name("question"), e.target.value)}
// //         />
// //       </div>
// //       <div>
// //         <Label>Question Type</Label>
// //         <Select
// //           value={q.questionType}
// //           onValueChange={(v) => setFieldValue(name("questionType"), v)}
// //         >
// //           <SelectTrigger className="w-full">
// //             <SelectValue placeholder="Question Type" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             <SelectItem value="MCQ">Multiple Choice Question</SelectItem>
// //             <SelectItem value="FILL_IN_THE_BLANKS">Fill in the blanks</SelectItem>
// //             <SelectItem value="TRUE_FALSE">True / False</SelectItem>
// //           </SelectContent>
// //         </Select>
// //       </div>

// //       <div>
// //         <FormFileUpload
// //           name={name("image")}
// //           label="Upload Image*"
// //           accept="image/*"
// //           type="image"
// //         />
// //       </div>

// //       <div>
// //         <Label>Question Description</Label>
// //         <Textarea
// //           placeholder="Question Description"
// //           value={q.questionDescription}
// //           onChange={(e) => setFieldValue(name("questionDescription"), e.target.value)}
// //         />
// //       </div>

// //       <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
// //         {(q.options as Option[]).map((opt: Option, oIdx: number) => (
// //           <div key={opt.id} className="flex gap-3 items-start">
// //             <div className="flex-1">
// //               <Input
// //                 placeholder={`Option ${oIdx + 1}`}
// //                 value={opt.option}
// //                 onChange={(e) =>
// //                   setFieldValue(
// //                     name(`options.${oIdx}.option`),
// //                     e.target.value
// //                   )
// //                 }
// //               />
// //             </div>
// //             {canRemove && (
// //               <button
// //                 type="button"
// //                 className="px-3 py-2 rounded-md bg-red-50 text-red-600 border"
// //                 onClick={() =>
// //                   setFieldValue(
// //                     name("options"),
// //                     q.options.filter((_: any, i: number) => i !== oIdx)
// //                   )
// //                 }
// //               >
// //                 Remove
// //               </button>
// //             )}
// //           </div>
// //         ))}
// //         {canAdd && (
// //           <div>
// //             <CustomButton
// //               type="button"
// //               label="Add Answer"
// //               onClick={() =>
// //                 setFieldValue(name("options"), [
// //                   ...q.options,
// //                   { id: crypto.randomUUID(), option: "", isCorrect: false },
// //                 ])
// //               }
// //             />
// //           </div>
// //         )}
// //       </div>

// //       <div>
// //         <Label>Explanation</Label>
// //         <Textarea
// //           placeholder="Enter Explanation of the Question"
// //           value={q.explanation}
// //           onChange={(e) => setFieldValue(name("explanation"), e.target.value)}
// //         />
// //       </div>
// //       <div>
// //         <Label>Choose Answer</Label>
// //         <Select value={q.answer} onValueChange={onAnswerChange}>
// //           <SelectTrigger className="w-full">
// //             <SelectValue placeholder="Select Answer" />
// //           </SelectTrigger>
// //           <SelectContent>
// //             {(q.options as Option[])
// //               .filter((o) => o.option.trim().length > 0)
// //               .map((o) => (
// //                 <SelectItem key={o.id} value={o.option}>
// //                   {o.option || "Option"}
// //                 </SelectItem>
// //               ))}
// //           </SelectContent>
// //         </Select>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddQuestionBoards;

// "use client";

// import React, { Fragment } from "react";
// import { Formik, Form, FieldArray } from "formik";
// import * as Yup from "yup";
// import { TextareaField } from "@/components/ui/common/TextareaField";
// import { CustomButton } from "@/components/ui/common/CustomButton";
// import { Copy, Plus, Trash2 } from "lucide-react";
// import { FormFileUpload } from "@/components/ui/common/CustomImageUpload";
// import { InputField } from "@/components/ui/common/InputField";
// import { Dropdown } from "@/components/ui/common/Dropdown";

// type Option = { id: string; option: string; isCorrect: boolean };

// type QuestionBase = {
//   question: string;
//   questionType: "MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE";
//   questionDescription: string;
//   explanation: string;
//   options: Option[];
//   answer?: string; // value equals an option text; used to toggle isCorrect
//   image?: any;
// };

// type WithoutParagraphQuestion = QuestionBase & {
//   layoutType: "WITHOUT_PARAGRAPH";
// };

// type ParagraphSubQuestion = QuestionBase;

// type ParagraphQuestion = {
//   layoutType: "PARAGRAPH";
//   mainQuestionTitle: string;
//   mainQuestionDescription: string;
//   paragraph?: string; // alias for API
//   subQuestions: ParagraphSubQuestion[];
// };

// type Question = WithoutParagraphQuestion | ParagraphQuestion;

// type FormValues = {
//   questionBoardTitle: string;
//   topic: string;
//   subTopic: string;
//   grade: string;
//   subject: string;
//   durationTime: string;
//   level: "Easy" | "Medium" | "Hard" | "";
//   passPacentage: number | "";
//   country: string;
//   boardImage?: any;
//   status: "DRAFT" | "APPROVED";
//   questions: Question[];
// };

// // Mock data (replace with API hooks later)
// const TOPICS: Record<string, string[]> = {
//   Mathematics: ["Addition", "Subtraction", "Multiplication"],
//   Science: ["Physics", "Chemistry", "Biology"],
// };

// const GRADES = [
//   { id: "68ef750a9ddbbbf949f27982", label: "Grade 5" },
//   { id: "68ef750a9ddbbbf949f27983", label: "Grade 6" },
// ];

// const SUBJECTS_BY_GRADE: Record<string, string[]> = {
//   "68ef750a9ddbbbf949f27982": ["Mathematics", "Science"],
//   "68ef750a9ddbbbf949f27983": ["Mathematics", "Geography"],
// };

// const baseOptions = (): Option[] => [
//   { id: crypto.randomUUID(), option: "", isCorrect: false },
//   { id: crypto.randomUUID(), option: "", isCorrect: false },
// ];

// const emptyWithoutParagraph = (): WithoutParagraphQuestion => ({
//   layoutType: "WITHOUT_PARAGRAPH",
//   question: "",
//   questionType: "MCQ",
//   questionDescription: "",
//   explanation: "",
//   options: baseOptions(),
//   answer: undefined,
//   image: undefined,
// });

// const emptyParagraph = (): ParagraphQuestion => ({
//   layoutType: "PARAGRAPH",
//   mainQuestionTitle: "",
//   mainQuestionDescription: "",
//   paragraph: "",
//   subQuestions: [
//     {
//       question: "",
//       questionType: "MCQ",
//       questionDescription: "",
//       explanation: "",
//       options: baseOptions(),
//       answer: undefined,
//       image: undefined,
//     },
//   ],
// });

// const optionArraySchema = Yup.array()
//   .of(
//     Yup.object({
//       option: Yup.string().trim().required("Option is required"),
//       isCorrect: Yup.boolean().required(),
//       id: Yup.string().required(),
//     })
//   )
//   .min(2, "At least 2 options")
//   .max(4, "Maximum 4 options");

// const questionBaseSchema = {
//   question: Yup.string().trim().required("Question title is required"),
//   questionType: Yup.mixed<"MCQ" | "FILL_IN_THE_BLANKS" | "TRUE_FALSE">()
//     .oneOf(["MCQ", "FILL_IN_THE_BLANKS", "TRUE_FALSE"])
//     .required(),
//   questionDescription: Yup.string().trim().required("Description is required"),
//   explanation: Yup.string().trim().required("Explanation is required"),
//   options: optionArraySchema,
//   answer: Yup.string().when("questionType", (questionType, schema) => {
//     return questionType && questionType[0] === "MCQ"
//       ? schema.required("Choose answer is required for MCQ")
//       : schema.optional();
//   }),
// };

// const validationSchema = Yup.object({
//   questionBoardTitle: Yup.string().trim().required("Required"),
//   topic: Yup.string().required("Required"),
//   subTopic: Yup.string().required("Required"),
//   grade: Yup.string().required("Required"),
//   subject: Yup.string().required("Required"),
//   durationTime: Yup.string().matches(/^\d+$/, "Must be a number").required(),
//   level: Yup.mixed().oneOf(["Easy", "Medium", "Hard"]).required("Required"),
//   passPacentage: Yup.number().min(0).max(100).required("Required"),
//   country: Yup.string().required("Required"),
//   boardImage: Yup.mixed().nullable(),
//   questions: Yup.array()
//     .of(
//       Yup.lazy((val: any) => {
//         if (val?.layoutType === "PARAGRAPH") {
//           return Yup.object({
//             layoutType: Yup.mixed().oneOf(["PARAGRAPH"]).required(),
//             mainQuestionTitle: Yup.string().trim().required("Required"),
//             mainQuestionDescription: Yup.string().trim().required("Required"),
//             paragraph: Yup.string().nullable(),
//             subQuestions: Yup.array()
//               .of(Yup.object(questionBaseSchema))
//               .min(1)
//               .required(),
//           });
//         }
//         return Yup.object({
//           layoutType: Yup.mixed().oneOf(["WITHOUT_PARAGRAPH"]).required(),
//           ...questionBaseSchema,
//         });
//       })
//     )
//     .min(1, "Add at least one question"),
// });

// const initialValues: FormValues = {
//   questionBoardTitle: "",
//   topic: "",
//   subTopic: "",
//   grade: "",
//   subject: "",
//   durationTime: "30",
//   level: "",
//   passPacentage: 40,
//   country: "India",
//   boardImage: undefined,
//   status: "DRAFT",
//   questions: [emptyWithoutParagraph()],
// };

// export const Label = ({ children }: { children: React.ReactNode }) => {
//   return <label className="block mb-2 text-sm font-medium">{children}</label>;
// };

// export const FieldError = ({ name, errors, touched }: any) => {
//   return errors?.[name] && touched?.[name] ? (
//     <p className="text-red-500 text-xs mt-1">{String(errors[name])}</p>
//   ) : null;
// };

// const AddQuestionBoards = () => {
//   const toApiPayload = (values: FormValues) => {
//     let questionNumber = 1;
//     const questions = values.questions.flatMap((q, idx) => {
//       if (q.layoutType === "PARAGRAPH") {
//         const groupNumber = idx + 1;
//         const paragraph = q.mainQuestionDescription;
//         return q.subQuestions?.map((sq, sIdx) => {
//           const mappedOptions = sq.options.map((o) => ({
//             option: o.option,
//             isCorrect: sq.answer === o.option,
//           }));
//           const item = {
//             isQuestionGroup: true,
//             number: groupNumber,
//             paragraph,
//             question: sq.question,
//             questionNumber: questionNumber++,
//             questionType:
//               sq.questionType === "FILL_IN_THE_BLANKS"
//                 ? "FILL_IN_THE_BLANKS"
//                 : sq.questionType === "TRUE_FALSE"
//                 ? "TRUE_FALSE"
//                 : "MCQ",
//             questionDescription: sq.questionDescription,
//             explanation: sq.explanation,
//             options: mappedOptions,
//           };
//           return item;
//         });
//       } else {
//         const mappedOptions = q.options.map((o) => ({
//           option: o.option,
//           isCorrect: q.answer === o.option,
//         }));
//         return [
//           {
//             isQuestionGroup: false,
//             number: idx + 1,
//             question: q.question,
//             questionNumber: questionNumber++,
//             questionType:
//               q.questionType === "FILL_IN_THE_BLANKS"
//                 ? "FILL_IN_THE_BLANKS"
//                 : q.questionType === "TRUE_FALSE"
//                 ? "TRUE_FALSE"
//                 : "MCQ",
//             questionDescription: q.questionDescription,
//             explanation: q.explanation,
//             options: mappedOptions,
//           },
//         ];
//       }
//     });

//     return {
//       questionBoardTitle: values.questionBoardTitle,
//       topic: values.topic,
//       subTopic: values.subTopic,
//       grade: values.grade,
//       durationTime: values.durationTime,
//       level: values.level,
//       status: values.status === "APPROVED" ? "APPROVED" : "DRAFT",
//       passPacentage: Number(values.passPacentage),
//       country: values.country,
//       questions,
//     };
//   };

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(vals) => {
//           const payload = toApiPayload(vals);
//           // replace with mutation
//           // eslint-disable-next-line no-console
//           console.log("QB Payload", payload);
//         }}
//       >
//         {({ values, errors, touched, setFieldValue }) => {
//           const subTopics = values.topic ? TOPICS[values.topic] ?? [] : [];
//           const subjects = values.grade
//             ? SUBJECTS_BY_GRADE[values.grade] ?? []
//             : [];

//           return (
//             <Form className="space-y-6">
//               <div className="bg-white rounded-[14px] p-6">
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="text-2xl font-semibold text-primary-text">
//                     Add Question Board
//                   </div>

//                   <div className="flex gap-3">
//                     <CustomButton
//                       type="submit"
//                       label="Save as Draft"
//                       className="h-12 bg-primary-foreground text-primary-text rounded-[7px] text-lg font-semibold hover:bg-gray-100 px-6 border border-background cursor-pointer"
//                       onClick={() => setFieldValue("status", "DRAFT")}
//                     />
//                     <CustomButton
//                       type="submit"
//                       label="Request to Publish"
//                       className="h-12 rounded-[7px]  px-6 bg-primary text-lg font-semibold cursor-pointer"
//                       onClick={() => setFieldValue("status", "APPROVED")}
//                     />
//                     <CustomButton
//                       type="button"
//                       label="Upload CSV"
//                       className="h-12 rounded-[7px] text-lg font-semibold  px-6 bg-slate-800 cursor-pointer hover:bg-black"
//                       startIcon={<Plus className="text-primary" />}
//                       onClick={() => {}}
//                     />
//                   </div>
//                 </div>

//                 {/* Board meta */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="lg:col-span-2">
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       placeholder="Question Board Title"
//                       label="Question Board Title"
//                       value={values.questionBoardTitle}
//                       className="h-14 text-base font-normal text-primary-text"
//                       required
//                       error={
//                         (touched as any).questionBoardTitle &&
//                         (errors as any).questionBoardTitle
//                           ? String((errors as any).questionBoardTitle)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("questionBoardTitle", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     <FormFileUpload
//                       name="boardImage"
//                       label="Upload Image*"
//                       accept="image/*"
//                       type="image"
//                       className=""
//                     />
//                   </div>

//                   <div>
//                     <TextareaField
//                       labelClassName="text-lg font-semibold"
//                       label="Question Description"
//                       placeholder="Question Description"
//                       value={(values as any).questionDescription || ""}
//                       required
//                       error={
//                         (touched as any).questionDescription &&
//                         (errors as any).questionDescription
//                           ? String((errors as any).questionDescription)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("questionDescription", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     {(() => {
//                       const topicOptions = Object.keys(TOPICS).map((t) => ({
//                         name: t,
//                         value: t,
//                       }));
//                       const topicValue =
//                         topicOptions.find((o) => o.value === values.topic) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Topic"
//                           className="h-14 text-base font-normal text-primary-text"
//                           labelClassName=" !text-lg font-semibold "
//                           options={topicOptions}
//                           value={topicValue}
//                           required
//                           error={
//                             (touched as any).topic && (errors as any).topic
//                               ? String((errors as any).topic)
//                               : undefined
//                           }
//                           onChange={(obj) => {
//                             setFieldValue("topic", obj?.value || "");
//                             setFieldValue("subTopic", "");
//                           }}
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const subOptions = subTopics.map((s) => ({
//                         name: s,
//                         value: s,
//                       }));
//                       const subValue =
//                         subOptions.find((o) => o.value === values.subTopic) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Subtopic"
//                           labelClassName=" !text-lg font-semibold "
//                           className="h-14 text-base font-normal text-primary-text"
//                           options={subOptions}
//                           value={subValue}
//                           required
//                           error={
//                             (touched as any).subTopic &&
//                             (errors as any).subTopic
//                               ? String((errors as any).subTopic)
//                               : undefined
//                           }
//                           onChange={(obj) =>
//                             setFieldValue("subTopic", obj?.value || "")
//                           }
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const gradeOptions = GRADES.map((g) => ({
//                         name: g.label,
//                         value: g.id,
//                       }));
//                       const gradeValue =
//                         gradeOptions.find((o) => o.value === values.grade) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Grade"
//                           className="h-14 text-base font-normal text-primary-text"
//                           labelClassName="text-lg font-semibold"
//                           options={gradeOptions}
//                           value={gradeValue}
//                           required
//                           error={
//                             (touched as any).grade && (errors as any).grade
//                               ? String((errors as any).grade)
//                               : undefined
//                           }
//                           onChange={(obj) => {
//                             setFieldValue("grade", obj?.value || "");
//                             setFieldValue("subject", "");
//                           }}
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const subjectOptions = subjects.map((s) => ({
//                         name: s,
//                         value: s,
//                       }));
//                       const subjectValue =
//                         subjectOptions.find(
//                           (o) => o.value === values.subject
//                         ) || null;
//                       return (
//                         <Dropdown
//                           labelClassName="text-lg font-semibold"
//                           className="h-14 text-base font-normal text-primary-text"
//                           label="Subject"
//                           options={subjectOptions}
//                           value={subjectValue}
//                           required
//                           error={
//                             (touched as any).subject && (errors as any).subject
//                               ? String((errors as any).subject)
//                               : undefined
//                           }
//                           onChange={(obj) =>
//                             setFieldValue("subject", obj?.value || "")
//                           }
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       label="Duration in Minutes"
//                       className="h-14 text-base font-normal text-primary-text"
//                       type="number"
//                       placeholder="30"
//                       value={values.durationTime}
//                       required
//                       error={
//                         (touched as any).durationTime &&
//                         (errors as any).durationTime
//                           ? String((errors as any).durationTime)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("durationTime", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     {(() => {
//                       const levelOptions = (
//                         ["Easy", "Medium", "Hard"] as const
//                       ).map((lvl) => ({ name: lvl, value: lvl }));
//                       const levelValue =
//                         levelOptions.find((o) => o.value === values.level) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Level"
//                           labelClassName="text-lg font-semibold"
//                           className="h-14 text-base font-normal text-primary-text"
//                           options={levelOptions}
//                           value={levelValue}
//                           required
//                           error={
//                             (touched as any).level && (errors as any).level
//                               ? String((errors as any).level)
//                               : undefined
//                           }
//                           onChange={(obj) =>
//                             setFieldValue("level", (obj?.value as any) || "")
//                           }
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div className="lg:col-span-2">
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       label="Pass Percentage"
//                       className="h-14 text-base font-normal text-primary-text"
//                       type="number"
//                       placeholder="40"
//                       value={values.passPacentage}
//                       required
//                       error={
//                         (touched as any).passPacentage &&
//                         (errors as any).passPacentage
//                           ? String((errors as any).passPacentage)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("passPacentage", Number(e.target.value))
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               <FieldArray name="questions">
//                 {({ remove, push, insert }) => (
//                   <div className="space-y-8">
//                     {values.questions.map((q, qIdx) => (
//                       <div
//                         key={qIdx}
//                         className="bg-white rounded-[14px] p-6"
//                         // className="rounded-2xl border p-5 bg-[#F1FBF8]"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="text-lg font-semibold">
//                             Q. {qIdx + 1}
//                           </h3>
//                           <div className="flex items-center gap-2">
//                             {(() => {
//                               const options = [
//                                 {
//                                   name: "Without Paragraph",
//                                   value: "WITHOUT_PARAGRAPH",
//                                 },
//                                 { name: "Paragraph type", value: "PARAGRAPH" },
//                               ];
//                               const val =
//                                 options.find((o) => o.value === q.layoutType) ||
//                                 null;
//                               return (
//                                 <Dropdown
//                                   labelClassName="text-lg font-semibold"
//                                   // label="Question Layout Type"
//                                   className="h-12 text-base font-normal text-primary-text w-[240px]"
//                                   options={options}
//                                   value={val}
//                                   onChange={(obj) =>
//                                     setFieldValue(
//                                       `questions.${qIdx}.layoutType`,
//                                       (obj?.value as any) || "WITHOUT_PARAGRAPH"
//                                     )
//                                   }
//                                 />
//                               );
//                             })()}

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 insert(qIdx + 1, JSON.parse(JSON.stringify(q)))
//                               }
//                               className="p-2 rounded-md border bg-white"
//                               title="Copy"
//                             >
//                               <Copy className="w-4 h-4" />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => remove(qIdx)}
//                               className="p-2 rounded-md border bg-white"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4 text-red-500" />
//                             </button>
//                           </div>
//                         </div>

//                         {q.layoutType === "WITHOUT_PARAGRAPH" ? (
//                           <QuestionFields
//                             basePath={`questions.${qIdx}`}
//                             values={values}
//                             errors={errors}
//                             touched={touched}
//                             setFieldValue={setFieldValue}
//                           />
//                         ) : (
//                           <div className="space-y-5">
//                             <div>
//                               <InputField
//                                 labelClassName="text-lg font-semibold"
//                                 className="h-14 text-base font-normal text-primary-text"
//                                 label="Main Question Title"
//                                 placeholder="Main Question Title"
//                                 value={
//                                   (q as ParagraphQuestion).mainQuestionTitle
//                                 }
//                                 onChange={(e) =>
//                                   setFieldValue(
//                                     `questions.${qIdx}.mainQuestionTitle`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div>
//                               <TextareaField
//                                 labelClassName="text-lg font-semibold"
//                                 label="Main Question Description"
//                                 value={
//                                   (q as ParagraphQuestion)
//                                     .mainQuestionDescription
//                                 }
//                                 onChange={(e) =>
//                                   setFieldValue(
//                                     `questions.${qIdx}.mainQuestionDescription`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>

//                             <FieldArray name={`questions.${qIdx}.subQuestions`}>
//                               {({
//                                 remove: removeSub,
//                                 push: pushSub,
//                                 insert: insertSub,
//                               }) => (
//                                 <div className="space-y-5">
//                                   <div className="flex items-center justify-between">
//                                     <h4 className="font-semibold">
//                                       Sub Questions
//                                     </h4>
//                                     <CustomButton
//                                       type="button"
//                                       className="h-10 px-6"
//                                       label="Add Sub Question"
//                                       startIcon={<Plus />}
//                                       onClick={() =>
//                                         pushSub({
//                                           question: "",
//                                           questionType: "MCQ",
//                                           questionDescription: "",
//                                           explanation: "",
//                                           options: baseOptions(),
//                                           answer: undefined,
//                                           image: undefined,
//                                         })
//                                       }
//                                     />
//                                   </div>

//                                   {(q as ParagraphQuestion)?.subQuestions?.map(
//                                     (_, sIdx) => (
//                                       <div
//                                         key={sIdx}
//                                         className="rounded-xl border p-4 bg-white"
//                                       >
//                                         <div className="flex items-center justify-between mb-3">
//                                           <span className="font-medium">
//                                             Sub Q. {sIdx + 1}
//                                           </span>
//                                           <div className="flex gap-2">
//                                             <button
//                                               type="button"
//                                               onClick={() =>
//                                                 insertSub(
//                                                   sIdx + 1,
//                                                   JSON.parse(
//                                                     JSON.stringify(
//                                                       (q as ParagraphQuestion)
//                                                         .subQuestions[sIdx]
//                                                     )
//                                                   )
//                                                 )
//                                               }
//                                               className="p-2 rounded-md border bg-white"
//                                               title="Copy"
//                                             >
//                                               <Copy className="w-4 h-4" />
//                                             </button>
//                                             <button
//                                               type="button"
//                                               onClick={() => removeSub(sIdx)}
//                                               className="p-2 rounded-md border bg-white"
//                                               title="Delete"
//                                             >
//                                               <Trash2 className="w-4 h-4 text-red-500" />
//                                             </button>
//                                           </div>
//                                         </div>

//                                         <QuestionFields
//                                           basePath={`questions.${qIdx}.subQuestions.${sIdx}`}
//                                           values={values}
//                                           errors={errors}
//                                           touched={touched}
//                                           setFieldValue={setFieldValue}
//                                         />
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               )}
//                             </FieldArray>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     <div className="flex justify-center">
//                       <CustomButton
//                         type="button"
//                         label="Add Question"
//                         startIcon={<Plus />}
//                         className="px-8 h-12 rounded-full text-lg font-semibold  w-full"
//                         onClick={() => push(emptyWithoutParagraph())}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </FieldArray>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export const QuestionFields = ({
//   basePath,
//   values,
//   errors,
//   touched,
//   setFieldValue,
// }: any) => {
//   const q = basePath
//     .split(".")
//     .reduce((acc: any, key: string) => acc?.[key], values);

//   const name = (suffix: string) => `${basePath}.${suffix}`;
//   const getAt = (obj: any, path: string) =>
//     path
//       .split(".")
//       .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

//   const canAdd = (q.options?.length ?? 0) < 4;
//   const canRemove = (q.options?.length ?? 0) > 2;

//   const onAnswerChange = (val: string) => {
//     setFieldValue(name("answer"), val);
//     // toggle flags for clarity in JSON mapping later
//     const next = q.options.map((o: Option) => ({
//       ...o,
//       isCorrect: o.option === val,
//     }));
//     setFieldValue(name("options"), next);
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <div>
//         <InputField
//           labelClassName="text-lg font-semibold"
//           className="h-14 text-base font-normal text-primary-text"
//           label="Question Title"
//           placeholder="Question Board Title"
//           value={q.question}
//           required
//           error={
//             getAt(errors, name("question")) && getAt(touched, name("question"))
//               ? String(getAt(errors, name("question")))
//               : undefined
//           }
//           onChange={(e) => setFieldValue(name("question"), e.target.value)}
//         />
//       </div>
//       <div>
//         {(() => {
//           const qtOptions = [
//             { name: "Multiple Choice Question", value: "MCQ" },
//             { name: "Fill in the blanks", value: "FILL_IN_THE_BLANKS" },
//             { name: "True / False", value: "TRUE_FALSE" },
//           ];
//           const qtValue =
//             qtOptions.find((o) => o.value === q.questionType) || null;
//           return (
//             <Dropdown
//               labelClassName="text-lg font-semibold"
//               label="Question Type"
//               className="h-14 text-base font-normal text-primary-text"
//               options={qtOptions}
//               value={qtValue}
//               required
//               onChange={(obj) =>
//                 setFieldValue(name("questionType"), obj?.value || "MCQ")
//               }
//             />
//           );
//         })()}
//       </div>

//       <div>
//         <FormFileUpload
//           name={name("image")}
//           label="Upload Image*"
//           accept="image/*"
//           type="image"
//         />
//       </div>

//       <div>
//         <TextareaField
//           labelClassName=" text-lg font-semibold  "
//           label="Question Description"
//           placeholder="Question Description"
//           value={q.questionDescription}
//           required
//           onChange={(e) =>
//             setFieldValue(name("questionDescription"), e.target.value)
//           }
//         />
//       </div>

//       <div className="lg:row-span-2 grid grid-cols-1 gap-4">
//         {(q.options as Option[]).map((opt: Option, oIdx: number) => (
//           <div key={opt.id} className="flex gap-3 items-start">
//             <div className="flex-1">
//               <InputField
//                 labelClassName="text-lg font-semibold"
//                 className="h-14 text-base font-normal text-primary-text"
//                 placeholder={`Option ${oIdx + 1}`}
//                 value={opt.option}
//                 required
//                 onChange={(e) =>
//                   setFieldValue(name(`options.${oIdx}.option`), e.target.value)
//                 }
//               />
//             </div>
//             {canRemove && (
//               <button
//                 type="button"
//                 className="px-3 h-full py-2 rounded-md bg-red-50 text-base font-semibold text-[#FF0000] cursor-pointer border-none hover:bg-red-200"
//                 onClick={() =>
//                   setFieldValue(
//                     name("options"),
//                     q.options.filter((_: any, i: number) => i !== oIdx)
//                   )
//                 }
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//         {canAdd && (
//           <div>
//             <CustomButton
//               type="button"
//               label="Add Answer"
//               onClick={() =>
//                 setFieldValue(name("options"), [
//                   ...q.options,
//                   { id: crypto.randomUUID(), option: "", isCorrect: false },
//                 ])
//               }
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <TextareaField
//           labelClassName=" text-lg font-semibold  "
//           label="Explanation"
//           placeholder="Enter Explanation of the Question"
//           value={q.explanation}
//           required
//           onChange={(e) => setFieldValue(name("explanation"), e.target.value)}
//         />
//       </div>
//       <div>
//         {(() => {
//           const answerOptions = (q.options as Option[])
//             .filter((o) => o.option.trim().length > 0)
//             .map((o) => ({ name: o.option || "Option", value: o.option }));
//           const answerValue =
//             answerOptions.find((o) => o.value === q.answer) || null;
//           return (
//             <Dropdown
//               labelClassName="text-lg font-semibold"
//               label="Choose Answer"
//               className="h-14 text-base font-normal text-primary-text"
//               options={answerOptions}
//               value={answerValue}
//               required
//               onChange={(obj) => onAnswerChange(obj?.value || "")}
//             />
//           );
//         })()}
//       </div>
//     </div>
//   );
// };

// export default AddQuestionBoards;
// "use client";

// import React, { Fragment } from "react";
// import { Formik, Form, FieldArray } from "formik";
// import { TextareaField } from "@/components/ui/common/TextareaField";
// import { CustomButton } from "@/components/ui/common/CustomButton";
// import { Copy, Plus, Trash2 } from "lucide-react";
// import { FormFileUpload } from "@/components/ui/common/CustomImageUpload";
// import { InputField } from "@/components/ui/common/InputField";
// import { Dropdown } from "@/components/ui/common/Dropdown";
// import {
//   useGetAllgrades,
//   useGetSubjectById,
// } from "@/hooks/queries/useGetAllgrades";
// import {
//   useGetAllTopics,
//   useGetSubTopicById,
// } from "@/hooks/queries/useGetTopics";
// import {
//   FormValues,
//   Option,
//   ParagraphQuestion,
//   WithoutParagraphQuestion,
// } from "@/components/interfaces/questionBoard/questionBoard.interface";
// import { validationSchema } from "@/components/schemas/questionBordSchema/QuestionBoardSchema";
// import { toQuestionBoardApiPayload } from "@/lib/utils";
// import { useAddQuestionBoard } from "@/hooks/mutations/useAddQuestionBoard";
// import { useRouter } from "next/navigation";

// // Dynamic data via hooks
// const baseOptions = (): Option[] => [
//   { id: crypto.randomUUID(), option: "", isCorrect: false },
//   { id: crypto.randomUUID(), option: "", isCorrect: false },
// ];

// const emptyWithoutParagraph = (): WithoutParagraphQuestion => ({
//   layoutType: "WITHOUT_PARAGRAPH",
//   question: "",
//   questionType: "MCQ",
//   questionDescription: "",
//   explanation: "",
//   options: baseOptions(),
//   answer: undefined,
//   image: undefined,
// });

// const emptyParagraph = (): ParagraphQuestion => ({
//   layoutType: "PARAGRAPH",
//   mainQuestionTitle: "",
//   mainQuestionDescription: "",
//   paragraph: "",
//   subQuestions: [
//     {
//       question: "",
//       questionType: "MCQ",
//       questionDescription: "",
//       explanation: "",
//       options: baseOptions(),
//       answer: undefined,
//       image: undefined,
//     },
//   ],
// });

// const initialValues: FormValues = {
//   questionBoardTitle: "",
//   topic: "",
//   subTopic: "",
//   grade: "",
//   subject: "",
//   durationTime: "30",
//   level: "",
//   passPacentage: 40,
//   country: "India",
//   boardImage: undefined,
//   status: "DRAFT",
//   questions: [emptyWithoutParagraph()],
// };

// const AddQuestionBoards = () => {
//   const { data: gradesResp } = useGetAllgrades();
//   const gradesList = gradesResp?.data || [];
//   const router = useRouter();         

//   const [selectedGradeId, setSelectedGradeId] = React.useState<string>("");
//   const [selectedSubjectName, setSelectedSubjectName] =
//     React.useState<string>("");
//   const [selectedTopicId, setSelectedTopicId] = React.useState<string>("");

//   const { data: subjectsData } = useGetSubjectById(selectedGradeId);
//   const subjectOptions: { name: string; value: string }[] = Array.isArray(
//     subjectsData?.subjects
//   )
//     ? subjectsData.subjects.map((s: string) => ({ name: s, value: s }))
//     : [];

//   const { data: topicsResp } = useGetAllTopics();
//   const topicsRaw =
//     topicsResp?.data?.data ?? topicsResp?.data ?? topicsResp ?? [];
//   const topicOptions: { name: string; value: string }[] = (
//     Array.isArray(topicsRaw) ? topicsRaw : []
//   ).map((t: any) => ({ name: t.topicName, value: t._id }));

//   const { data: subtopicsResp } = useGetSubTopicById(selectedTopicId);
//   const subtopicsRaw =
//     subtopicsResp?.data?.data ?? subtopicsResp?.data ?? subtopicsResp ?? [];
//   const subTopicOptions: { name: string; value: string }[] = Array.isArray(
//     subtopicsRaw
//   )
//     ? subtopicsRaw.map((st: any) => ({ name: st.subTopicName, value: st._id }))
//     : [];

//     const { mutate,isPending  } = useAddQuestionBoard()

//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(vals) => {
//           const payload = toQuestionBoardApiPayload(vals);

//           try {
//              mutate(payload, {
//               onSuccess: (res) => {
//                 console.log("✅ Question Board created successfully:", res);
//                 router.push("/admin/manage-question-boards");           
//               },
//               onError: (error) => {
//                 console.error("❌ Error creating Question Board:", error);
//               },
//             });
//             // eslint-disable-next-line no-console
//             console.log("QB Payload", payload);
//           } catch (error) {
//             // eslint-disable-next-line no-console
//             console.error(error);
//           }
//           // replace with mutation
//           // eslint-disable-next-line no-console
//           console.log("QB Payload", payload);
//         }}
//       >
//         {({ values, errors, touched, setFieldValue }) => {
//           return (
//             <Form className="space-y-6">
//               <div className="bg-white rounded-[14px] p-6">
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="text-2xl font-semibold text-primary-text">
//                     Add Question Board
//                   </div>

//                   <div className="flex gap-3">
//                     <CustomButton
//                       type="submit"
//                       label="Save as Draft"
//                       className="h-12 bg-primary-foreground text-primary-text rounded-[7px] text-lg font-semibold hover:bg-gray-100 px-6 border border-background cursor-pointer"
//                       onClick={() => setFieldValue("status", "DRAFT")}
//                     />
//                     <CustomButton
//                       type="submit"
//                       label="Request to Publish"
//                       loading = {isPending} 
//                       className="h-12 rounded-[7px]  px-6 bg-primary text-lg font-semibold cursor-pointer"
//                       onClick={() => setFieldValue("status", "APPROVED")}
//                     />
//                     <CustomButton
//                       type="button"
//                       label="Upload CSV"
//                       className="h-12 rounded-[7px] text-lg font-semibold  px-6 bg-slate-800 cursor-pointer hover:bg-black"
//                       startIcon={<Plus className="text-primary" />}
//                       onClick={() => {}}
//                     />
//                   </div>
//                 </div>

//                 {/* Board meta */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="lg:col-span-2">
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       placeholder="Question Board Title"
//                       label="Question Board Title"
//                       value={values.questionBoardTitle}
//                       className="h-14 text-base font-normal text-primary-text"
//                       required
//                       error={
//                         (touched as any).questionBoardTitle &&
//                         (errors as any).questionBoardTitle
//                           ? String((errors as any).questionBoardTitle)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("questionBoardTitle", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     <FormFileUpload
//                       name="boardImage"
//                       label="Upload Image*"
//                       accept="image/*"
//                       type="image"
//                       className=""
//                     />
//                   </div>

//                   <div>
//                     <TextareaField
//                       labelClassName="text-lg font-semibold"
//                       label="Question Description"
//                       placeholder="Question Description"
//                       value={(values as any).questionDescription || ""}
//                       required
//                       error={
//                         (touched as any).questionDescription &&
//                         (errors as any).questionDescription
//                           ? String((errors as any).questionDescription)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("questionDescription", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     {(() => {
//                       const selected =
//                         topicOptions.find((o) => o.value === values.topic) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Topic"
//                           className="h-14 text-base font-normal text-primary-text"
//                           labelClassName=" !text-lg font-semibold "
//                           options={topicOptions}
//                           value={selected}
//                           required
//                           error={
//                             (touched as any).topic && (errors as any).topic
//                               ? String((errors as any).topic)
//                               : undefined
//                           }
//                           onChange={(obj) => {
//                             const id = obj?.value || "";
//                             setFieldValue("topic", id);
//                             setSelectedTopicId(id);
//                             setFieldValue("subTopic", "");
//                           }}
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const selected =
//                         subTopicOptions.find(
//                           (o) => o.value === values.subTopic
//                         ) || null;
//                       return (
//                         <Dropdown
//                           label="Subtopic"
//                           labelClassName=" !text-lg font-semibold "
//                           className="h-14 text-base font-normal text-primary-text"
//                           options={subTopicOptions}
//                           value={selected}
//                           required
//                           error={
//                             (touched as any).subTopic &&
//                             (errors as any).subTopic
//                               ? String((errors as any).subTopic)
//                               : undefined
//                           }
//                           onChange={(obj) =>
//                             setFieldValue("subTopic", obj?.value || "")
//                           }
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const gradeOptions = Array.isArray(gradesList)
//                         ? gradesList.map((g: any) => ({
//                             name: g.name,
//                             value: g._id,
//                           }))
//                         : [];
//                       const selected =
//                         gradeOptions.find((o) => o.value === values.grade) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Grade"
//                           className="h-14 text-base font-normal text-primary-text"
//                           labelClassName="text-lg font-semibold"
//                           options={gradeOptions}
//                           value={selected}
//                           required
//                           error={
//                             (touched as any).grade && (errors as any).grade
//                               ? String((errors as any).grade)
//                               : undefined
//                           }
//                           onChange={(obj) => {
//                             const id = obj?.value || "";
//                             setFieldValue("grade", id);
//                             setSelectedGradeId(id);
//                             // Only clear dependent subject; keep topic/subtopic
//                             setFieldValue("subject", "");
//                             setSelectedSubjectName("");
//                           }}
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     {(() => {
//                       const selected =
//                         subjectOptions.find(
//                           (o) => o.value === values.subject
//                         ) || null;
//                       return (
//                         <Dropdown
//                           labelClassName="text-lg font-semibold"
//                           className="h-14 text-base font-normal text-primary-text"
//                           label="Subject"
//                           options={subjectOptions}
//                           value={selected}
//                           required
//                           error={
//                             (touched as any).subject && (errors as any).subject
//                               ? String((errors as any).subject)
//                               : undefined
//                           }
//                           onChange={(obj) => {
//                             const name = obj?.value || "";
//                             setFieldValue("subject", name);
//                             setSelectedSubjectName(name);
//                             // Subject is independent of topic/subtopic
//                           }}
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div>
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       label="Duration in Minutes"
//                       className="h-14 text-base font-normal text-primary-text"
//                       type="number"
//                       placeholder="30"
//                       value={values.durationTime}
//                       required
//                       error={
//                         (touched as any).durationTime &&
//                         (errors as any).durationTime
//                           ? String((errors as any).durationTime)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("durationTime", e.target.value)
//                       }
//                     />
//                   </div>

//                   <div>
//                     {(() => {
//                       const levelOptions = (
//                         ["Easy", "Medium", "Hard"] as const
//                       ).map((lvl) => ({ name: lvl, value: lvl }));
//                       const levelValue =
//                         levelOptions.find((o) => o.value === values.level) ||
//                         null;
//                       return (
//                         <Dropdown
//                           label="Level"
//                           labelClassName="text-lg font-semibold"
//                           className="h-14 text-base font-normal text-primary-text"
//                           options={levelOptions}
//                           value={levelValue}
//                           required
//                           error={
//                             (touched as any).level && (errors as any).level
//                               ? String((errors as any).level)
//                               : undefined
//                           }
//                           onChange={(obj) =>
//                             setFieldValue("level", (obj?.value as any) || "")
//                           }
//                         />
//                       );
//                     })()}
//                   </div>

//                   <div className="lg:col-span-2">
//                     <InputField
//                       labelClassName="text-lg font-semibold"
//                       label="Pass Percentage"
//                       className="h-14 text-base font-normal text-primary-text"
//                       type="number"
//                       placeholder="40"
//                       value={values.passPacentage}
//                       required
//                       error={
//                         (touched as any).passPacentage &&
//                         (errors as any).passPacentage
//                           ? String((errors as any).passPacentage)
//                           : undefined
//                       }
//                       onChange={(e) =>
//                         setFieldValue("passPacentage", Number(e.target.value))
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>

//               <FieldArray name="questions">
//                 {({ remove, push, insert }) => (
//                   <div className="space-y-8">
//                     {values.questions.map((q, qIdx) => (
//                       <div
//                         key={qIdx}
//                         className="bg-white rounded-[14px] p-6"
//                         // className="rounded-2xl border p-5 bg-[#F1FBF8]"
//                       >
//                         <div className="flex items-center justify-between mb-4">
//                           <h3 className="text-lg font-semibold">
//                             Q. {qIdx + 1}
//                           </h3>
//                           <div className="flex items-center gap-2">
//                             {(() => {
//                               const options = [
//                                 {
//                                   name: "Without Paragraph",
//                                   value: "WITHOUT_PARAGRAPH",
//                                 },
//                                 { name: "Paragraph type", value: "PARAGRAPH" },
//                               ];
//                               const val =
//                                 options.find((o) => o.value === q.layoutType) ||
//                                 null;
//                               return (
//                                 <Dropdown
//                                   labelClassName="text-lg font-semibold"
//                                   // label="Question Layout Type"
//                                   className="h-12 text-base font-normal text-primary-text w-[240px]"
//                                   options={options}
//                                   value={val}
//                                   onChange={(obj) =>
//                                     setFieldValue(
//                                       `questions.${qIdx}.layoutType`,
//                                       (obj?.value as any) || "WITHOUT_PARAGRAPH"
//                                     )
//                                   }
//                                 />
//                               );
//                             })()}

//                             <button
//                               type="button"
//                               onClick={() =>
//                                 // insert(qIdx + 1, JSON.parse(JSON.stringify(q)))
//                                 push(JSON.parse(JSON.stringify(q)))
//                               }
//                               className="p-2 rounded-md border bg-white"
//                               title="Copy"
//                             >
//                               <Copy className="w-4 h-4" />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => remove(qIdx)}
//                               className="p-2 rounded-md border bg-white"
//                               title="Delete"
//                             >
//                               <Trash2 className="w-4 h-4 text-red-500" />
//                             </button>
//                           </div>
//                         </div>

//                         {q.layoutType === "WITHOUT_PARAGRAPH" ? (
//                           <QuestionFields
//                             basePath={`questions.${qIdx}`}
//                             values={values}
//                             errors={errors}
//                             touched={touched}
//                             setFieldValue={setFieldValue}
//                           />
//                         ) : (
//                           <div className="space-y-5">
//                             <div>
//                               <InputField
//                                 labelClassName="text-lg font-semibold"
//                                 className="h-14 text-base font-normal text-primary-text"
//                                 label="Main Question Title"
//                                 placeholder="Main Question Title"
//                                 value={
//                                   (q as ParagraphQuestion).mainQuestionTitle
//                                 }
//                                 onChange={(e) =>
//                                   setFieldValue(
//                                     `questions.${qIdx}.mainQuestionTitle`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>
//                             <div>
//                               <TextareaField
//                                 labelClassName="text-lg font-semibold"
//                                 label="Main Question Description"
//                                 value={
//                                   (q as ParagraphQuestion)
//                                     .mainQuestionDescription
//                                 }
//                                 onChange={(e) =>
//                                   setFieldValue(
//                                     `questions.${qIdx}.mainQuestionDescription`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             </div>

//                             <FieldArray name={`questions.${qIdx}.subQuestions`}>
//                               {({
//                                 remove: removeSub,
//                                 push: pushSub,
//                                 insert: insertSub,
//                               }) => (
//                                 <div className="space-y-5">
//                                   <div className="flex items-center justify-between">
//                                     <h4 className="font-semibold">
//                                       Sub Questions
//                                     </h4>
//                                     <CustomButton
//                                       type="button"
//                                       className="h-10 px-6"
//                                       label="Add Sub Question"
//                                       startIcon={<Plus />}
//                                       onClick={() =>
//                                         pushSub({
//                                           question: "",
//                                           questionType: "MCQ",
//                                           questionDescription: "",
//                                           explanation: "",
//                                           options: baseOptions(),
//                                           answer: undefined,
//                                           image: undefined,
//                                         })
//                                       }
//                                     />
//                                   </div>

//                                   {(q as ParagraphQuestion)?.subQuestions?.map(
//                                     (_, sIdx) => (
//                                       <div
//                                         key={sIdx}
//                                         className="rounded-xl border p-4 bg-white"
//                                       >
//                                         <div className="flex items-center justify-between mb-3">
//                                           <span className="font-medium">
//                                             Sub Q. {sIdx + 1}
//                                           </span>
//                                           <div className="flex gap-2">
//                                             <button
//                                               type="button"
//                                               onClick={() =>
//                                                 insertSub(
//                                                   sIdx + 1,
//                                                   JSON.parse(
//                                                     JSON.stringify(
//                                                       (q as ParagraphQuestion)
//                                                         .subQuestions[sIdx]
//                                                     )
//                                                   )
//                                                 )
//                                               }
//                                               className="p-2 rounded-md border bg-white"
//                                               title="Copy"
//                                             >
//                                               <Copy className="w-4 h-4" />
//                                             </button>
//                                             <button
//                                               type="button"
//                                               onClick={() => removeSub(sIdx)}
//                                               className="p-2 rounded-md border bg-white"
//                                               title="Delete"
//                                             >
//                                               <Trash2 className="w-4 h-4 text-red-500" />
//                                             </button>
//                                           </div>
//                                         </div>

//                                         <QuestionFields
//                                           basePath={`questions.${qIdx}.subQuestions.${sIdx}`}
//                                           values={values}
//                                           errors={errors}
//                                           touched={touched}
//                                           setFieldValue={setFieldValue}
//                                         />
//                                       </div>
//                                     )
//                                   )}
//                                 </div>
//                               )}
//                             </FieldArray>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     <div className="flex justify-center">
//                       <CustomButton
//                         type="button"
//                         label="Add Question"
//                         startIcon={<Plus />}
//                         className="px-8 h-12 rounded-full text-lg font-semibold  w-full"
//                         onClick={() => push(emptyWithoutParagraph())}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </FieldArray>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export const QuestionFields = ({
//   basePath,
//   values,
//   errors,
//   touched,
//   setFieldValue,
// }: any) => {
//   const q = basePath
//     .split(".")
//     .reduce((acc: any, key: string) => acc?.[key], values);

//   const name = (suffix: string) => `${basePath}.${suffix}`;
//   const getAt = (obj: any, path: string) =>
//     path
//       .split(".")
//       .reduce((acc: any, key: string) => (acc ? acc[key] : undefined), obj);

//   const canAdd = (q.options?.length ?? 0) < 4;
//   const canRemove = (q.options?.length ?? 0) > 2;

//   const onAnswerChange = (val: string) => {
//     setFieldValue(name("answer"), val);
//     // toggle flags for clarity in JSON mapping later
//     const next = q.options.map((o: Option) => ({
//       ...o,
//       isCorrect: o.option === val,
//     }));
//     setFieldValue(name("options"), next);
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       <div>
//         <InputField
//           labelClassName="text-lg font-semibold"
//           className="h-14 text-base font-normal text-primary-text"
//           label="Question Title"
//           placeholder="Question Board Title"
//           value={q.question}
//           required
//           error={
//             getAt(errors, name("question")) && getAt(touched, name("question"))
//               ? String(getAt(errors, name("question")))
//               : undefined
//           }
//           onChange={(e) => setFieldValue(name("question"), e.target.value)}
//         />
//       </div>
//       <div>
//         {(() => {
//           const qtOptions = [
//             { name: "Multiple Choice Question", value: "MCQ" },
//             { name: "Fill in the blanks", value: "FILL_IN_THE_BLANKS" },
//             { name: "True / False", value: "TRUE_FALSE" },
//           ];
//           const qtValue =
//             qtOptions.find((o) => o.value === q.questionType) || null;
//           return (
//             <Dropdown
//               labelClassName="text-lg font-semibold"
//               label="Question Type"
//               className="h-14 text-base font-normal text-primary-text"
//               options={qtOptions}
//               value={qtValue}
//               required
//               onChange={(obj) =>
//                 setFieldValue(name("questionType"), obj?.value || "MCQ")
//               }
//             />
//           );
//         })()}
//       </div>

//       <div>
//         <FormFileUpload
//           name={name("image")}
//           label="Upload Image*"
//           accept="image/*"
//           type="image"
//         />
//       </div>

//       <div>
//         <TextareaField
//           labelClassName=" text-lg font-semibold  "
//           label="Question Description"
//           placeholder="Question Description"
//           value={q.questionDescription}
//           required
//           onChange={(e) =>
//             setFieldValue(name("questionDescription"), e.target.value)
//           }
//         />
//       </div>

//       <div className="lg:row-span-2 grid grid-cols-1 gap-4">
//         {(q.options as Option[]).map((opt: Option, oIdx: number) => (
//           <div key={opt.id} className="flex gap-3 items-start">
//             <div className="flex-1">
//               <InputField
//                 labelClassName="text-lg font-semibold"
//                 className="h-14 text-base font-normal text-primary-text"
//                 placeholder={`Option ${oIdx + 1}`}
//                 value={opt.option}
//                 required
//                 onChange={(e) =>
//                   setFieldValue(name(`options.${oIdx}.option`), e.target.value)
//                 }
//               />
//             </div>
//             {canRemove && (
//               <button
//                 type="button"
//                 className="px-3 h-full py-2 rounded-md bg-red-50 text-base font-semibold text-[#FF0000] cursor-pointer border-none hover:bg-red-200"
//                 onClick={() =>
//                   setFieldValue(
//                     name("options"),
//                     q.options.filter((_: any, i: number) => i !== oIdx)
//                   )
//                 }
//               >
//                 Remove
//               </button>
//             )}
//           </div>
//         ))}
//         {canAdd && (
//           <div>
//             <CustomButton
//               type="button"
//               label="Add Answer"
//               onClick={() =>
//                 setFieldValue(name("options"), [
//                   ...q.options,
//                   { id: crypto.randomUUID(), option: "", isCorrect: false },
//                 ])
//               }
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <TextareaField
//           labelClassName=" text-lg font-semibold  "
//           label="Explanation"
//           placeholder="Enter Explanation of the Question"
//           value={q.explanation}
//           required
//           onChange={(e) => setFieldValue(name("explanation"), e.target.value)}
//         />
//       </div>

//       <div>
//         {(() => {
//           const answerOptions = (q.options as Option[])
//             .filter((o) => o.option.trim().length > 0)
//             .map((o) => ({ name: o.option || "Option", value: o.option }));
//           const answerValue =
//             answerOptions.find((o) => o.value === q.answer) || null;
//           return (
//             <Dropdown
//               labelClassName="text-lg font-semibold"
//               label="Choose Answer"
//               className="h-14 text-base font-normal text-primary-text"
//               options={answerOptions}
//               value={answerValue}
//               required
//               onChange={(obj) => onAnswerChange(obj?.value || "")}
//             />
//           );
//         })()}
//       </div>
//     </div>
//   );
// };

// export default AddQuestionBoards;
