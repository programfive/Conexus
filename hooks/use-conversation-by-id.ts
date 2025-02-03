import useSWR from 'swr';
import { FullConversationType } from '@/types';

export const useConversationById = (
  conversationId: string,
  fallbackData?: FullConversationType
) => {
  const { data, error, mutate, isLoading } = useSWR<FullConversationType>(
    `/api/conversations/${conversationId}`,
    {
      fallbackData,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return {
    conversationById: data,
    isLoadingConversationById: isLoading,
    isErrorConversationById: error,
    mutateConversationById: mutate,
  };
};
