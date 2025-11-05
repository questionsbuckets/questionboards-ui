import {  SigninPayload } from "@/components/interfaces/auth/auth.interface";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useSignin() {
  return useMutation({

    mutationFn: async (payload: SigninPayload) => {
      const res = await axiosInstance.post("/user/signin", payload);
      return res.data;
    },
  });
}
