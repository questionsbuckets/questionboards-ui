import { FormValues } from "@/components/interfaces/questionBoard/questionBoard.interface";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const useAddQuestionBoard = () => {
  return useMutation({  
    mutationFn: async (payload: FormValues) => {
      const res = await axiosInstance.post("/questionBoard/add-question-board", payload);
      return res.data;
    },
  });                               
};