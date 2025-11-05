import { SignupPayload } from "@/components/interfaces/auth/auth.interface";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useSignup() {
  return useMutation({
    mutationFn: async (payload: SignupPayload) => {
      const res = await axiosInstance.post("/user/signup", payload);
      return res.data;
    },
  });
}
