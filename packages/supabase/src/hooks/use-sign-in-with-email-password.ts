import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSupabase } from './use-supabase';

export function useSignInWithEmailPassword() {
  const client = useSupabase();
  const queryClient = useQueryClient();

  const mutationFn = async (credentials: SignInWithPasswordCredentials) => {
    const response = await client.auth.signInWithPassword(credentials);

    if (response.error) {
      console.error(response.error);
      throw response.error.message;
    }

    const user = response.data?.user;
    const identities = user?.identities ?? [];

    // if the user has no identities, it means that the email is taken
    if (identities.length === 0) {
      throw new Error('User already registered');
    }

    return response.data;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      return queryClient.refetchQueries({
        queryKey: ['supabase', 'user'],
      });
    },
  });
}
