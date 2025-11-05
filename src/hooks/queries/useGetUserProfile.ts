import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetUserProfile() {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/user/get-user-details`);
      return  res.data.data;
    },
  });
}
