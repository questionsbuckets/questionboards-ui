import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

interface GetQuestionBoard {
  page: number;
  limit: number;
  searchQuery?: string;
  topicId?: string;
  type?: string;
  status?: string;
}

export const useGetAllQuestionBoards = (params: GetQuestionBoard) => {
  const Queryparams = {
    page: params.page,
    limit: params.limit,
    searchQuery: params.searchQuery,
    topicId: params.topicId,
    type: params.type,
    status: params.status,
  };

  const queryString = Object.entries(Queryparams)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const url = `/admin/fetch-question-board?${queryString}`;

  return useQuery({
    queryKey: ["allQuestionBoards"],
    queryFn: async () => {
      const res = await axiosInstance.get(url);
      return res.data;
    },
  });
};


export const useGetQuestionBoardById = (id: string) => {      
  return useQuery({
    queryKey: ["questionBoardById", id],
    queryFn: async () => {
      const url = `/questionBoard/get-question-board?questionBoardId=${id}&page=1&limit=100`;
      const res = await axiosInstance.get(url);
        if(res?.data?.status){
            return res.data.data;
        }
        return res.data;
    },
    enabled: !!id,
  });
};
