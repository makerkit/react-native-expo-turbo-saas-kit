import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Database, useSupabase } from '@kit/supabase';

import { accountQueryKey } from './use-fetch-profile';

type UpdateData = Database['public']['Tables']['accounts']['Update'];

/**
 * This mutation is used to update the user's account data.
 * It takes in an object with the updated data and returns the updated data.
 *
 * @param accountId
 */
export function useUpdateAccountDataMutation(accountId: string) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationKey = ['account:data', accountId];

  const mutationFn = async (data: UpdateData) => {
    const response = await client.from('accounts').update(data).match({
      id: accountId,
    });

    if (response.error) {
      throw response.error;
    }

    return response.data;
  };

  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: accountQueryKey(accountId),
      });
    },
  });
}
