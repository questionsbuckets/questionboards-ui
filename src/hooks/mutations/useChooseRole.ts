import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useChooseRole() {
  return useMutation({
    mutationFn: async (payload: string) => {
      const res = await axiosInstance.post("/user/updateRole", {
        role: payload,
      });
      return res.data;
    },
  });
}
