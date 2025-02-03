import useSWR from "swr";
import { User } from "@prisma/client";

export const useUsers = (fallbackData?: User[]) => {
  const { data, error, mutate, isLoading } = useSWR<User[]>("/api/users", {
    fallbackData,
  });

  return {
    users: data,
    isLoadingUsers: isLoading,
    isError: error,
    mutate,
  };
};
