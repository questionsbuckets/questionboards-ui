import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export function useHandleImageUpload () {
  return useMutation({
    mutationKey: ["handleImageUpload"],
    mutationFn: async (payload: { image: File } | null | undefined) => {
      const res = await axiosInstance.post(`/questionBoard/upload-image`, payload);
      if(res?.data?.status){
        return res.data.data;
      }
      return res.data.message || "Something went wrong" || "Failed to upload image";
    },
  });
}

export function useHandleImageRemoval () {
  return useMutation({
    mutationKey: ["handleImageRemoval"],
    mutationFn: async (payload: { imageUrl: string }) => {
          const res = await axiosInstance.post(`/questionBoard/remove-image`, payload);
      if(res?.data?.status){
        return res.data.data;
      }
      return res.data.message  || "Something went wrong" || "Failed to remove image";
    },
  });
}