import { useQueryClient } from "@tanstack/react-query";
import { useGetUserProfile } from "../queries/useGetUserProfile";
import { LogoutAll } from "@/utils/logout";

export function useAuth() {
  const { data: user, isLoading, refetch } = useGetUserProfile();
  const queryClient = useQueryClient();

  const logout = async () => {
    queryClient.removeQueries({ queryKey: ["userProfile"] });
    await LogoutAll();
  };

  return { user, isLoading, refetch, logout };
}
