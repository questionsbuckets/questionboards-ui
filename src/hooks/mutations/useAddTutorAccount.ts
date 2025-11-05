import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useAddTutorAccount() {
  return useMutation({

    mutationFn: async (payload: FormData) => {
      const res = await axiosInstance.post("/tutor/add-tutor-account", payload);
      return res.data;
    },
  });
}
