import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useAddParentsAccount() {
  return useMutation({

    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post("/parents/add-parents-account", payload);
      return res.data;
    },
  });
}




export function useAddStudentAccount() {
  return useMutation({

    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post("/student/add-student-account", payload);
      return res.data;
    },
  });
}
