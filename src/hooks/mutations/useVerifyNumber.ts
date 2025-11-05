import { SignupPayload } from "@/components/interfaces/auth/auth.interface";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

interface IVerifyNumber {
  phoneNumber: string;
  code: string;
}

export function useVerifyNumber() {
  return useMutation({
    mutationFn: async (payload: IVerifyNumber) => {
      const res = await axiosInstance.post("/user/verifyOtp", payload);
      return res.data;
    },
  });
}
