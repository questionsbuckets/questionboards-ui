import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";
interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
export function useResetPassword() {
  return useMutation({
    mutationFn: async (payload: IResetPassword) => {
      const res = await axiosInstance.post("/user/confrimPassword", payload);
      return res.data;
    },
  });
}
