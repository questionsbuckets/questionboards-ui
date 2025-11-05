import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetAllgrades() {
  return useQuery({
    queryKey: ["allGrades"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/grade/fetch-grades`);
      return res.data;
    },
  });
}

export function useGetSubjectById(gradeId?: string) {
  return useQuery({
    queryKey: ["subjects", gradeId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/grade/fetch-grades?gradeId=${gradeId}`
      );
      if(res?.data?.status){
        return res.data.data;
      }
      return res.data;
    },
    enabled: !!gradeId,

  });
}
