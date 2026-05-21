import { useQuery } from '@tanstack/react-query';

import { useSupabase } from '@kit/supabase';

export const accountQueryKey = (userId: string | null | undefined) => [
  'user',
  'account',
  userId,
];

export function useFetchAccount(userId: string | null | undefined) {
  const supabase = useSupabase();

  const queryFn = async () => {
    if (!userId) {
      return null;
    }

    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', userId)
      .limit(1)
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey: accountQueryKey(userId),
    queryFn,
    enabled: !!userId,
  });
}
