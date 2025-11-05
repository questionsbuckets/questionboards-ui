import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

export function useGetAllTopics() {
  return useQuery({
    queryKey: ["allTopics"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/admin/get-all-topic`);
      return res.data;
    },
  });
}

export function useGetSubTopicById(topicId?: string) {
  return useQuery({
    queryKey: ["subTopics", topicId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/admin/get-all-topic?topicId=${topicId}`
      );
      if(res?.data?.status){
        return res.data.data;
      }
      return res.data;
    },
    enabled: !!topicId,

  });
}
