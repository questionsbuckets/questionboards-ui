import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useForgetPassword() {
  return useMutation({
    mutationFn: async (payload: string) => {
      const res = await axiosInstance.post("/user/forgetPassword", {
        phoneNumber: payload,
      });
      return res.data;
    },
  });
}
