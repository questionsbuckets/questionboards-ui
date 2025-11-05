import { FormValues } from "@/components/interfaces/questionBoard/questionBoard.interface";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const useUpdateQuestionBoard = () => {
  return useMutation({  
    mutationFn: async (payload: FormValues) => {


      console.log('Payload=====>', payload)

      const res = await axiosInstance.post("/questionBoard/update-question-board", payload);
      return res.data;
    },
  });                               
};

export const useDeleteQuestionBoard = () => {
  return useMutation({
    mutationFn: async (payload: { questionBoardId: string }) => {
        const res = await axiosInstance.delete(`/questionBoard/delete-question-board?questionBoardId=${payload.questionBoardId}`);
        if(res?.data?.status){
            return res.data.data;
        }
        return res.data.message || "Something went wrong" || "Failed to delete question board";
    },
  });
};