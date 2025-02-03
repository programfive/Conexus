import useSWR from 'swr';
import { FullConversationType } from '@/types';

export const useConversations = (fallbackData?: FullConversationType[]) => {
  const { data, error, mutate, isLoading } = useSWR<FullConversationType[]>(
    '/api/conversations'
  );
  return {
    conversations: data,
    isLoadingConversation: isLoading,
    isErrorConversation: error,
    mutateConversation: mutate,
  };
};
