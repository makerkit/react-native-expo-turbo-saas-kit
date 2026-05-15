import { SupabaseClient } from '@supabase/supabase-js';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Database, useSupabase } from '@kit/supabase';

import { accountQueryKey } from './use-fetch-profile';

const AVATARS_BUCKET = 'account_image';

type UpdateAvatarInput = {
  /** Local file URI of the new image, or `null` to clear the existing avatar. */
  uri: string | null;
  previousPictureUrl: string | null;
};

/**
 * Mutation for setting or clearing the current user's avatar.
 *
 * - `uri: string` — uploads the bytes to the `account_image` storage bucket
 *   and writes the resulting public URL to `accounts.picture_url`.
 * - `uri: null` — deletes the existing storage object (if any) and nulls out
 *   `picture_url`.
 *
 * On success the cached account row is invalidated so any UI reading it via
 * `useFetchAccount` re-renders with the new value (no consumer-side bookkeeping
 * required).
 */
export function useUpdateAvatar(userId: string) {
  const client = useSupabase();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ uri, previousPictureUrl }: UpdateAvatarInput) => {
      if (previousPictureUrl) {
        await deleteAvatarObject(client, previousPictureUrl);
      }

      if (uri === null) {
        await client
          .from('accounts')
          .update({ picture_url: null })
          .eq('id', userId)
          .throwOnError();
        return;
      }

      const publicUrl = await uploadAvatarBytes(client, uri, userId);

      await client
        .from('accounts')
        .update({ picture_url: publicUrl })
        .eq('id', userId)
        .throwOnError();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: accountQueryKey(userId) }),
  });
}

async function uploadAvatarBytes(
  client: SupabaseClient<Database>,
  uri: string,
  userId: string,
): Promise<string> {
  const bytes = await fetch(uri).then((response) => response.arrayBuffer());
  // Cache-buster appended via Date.now() — non-cryptographic randomness is
  // adequate here (per-user file, monotonic timestamp). Avoids depending on
  // `nanoid`, which would need a CSPRNG polyfill on native.
  const fileName = `${userId}.jpg?v=${Date.now().toString(36)}`;
  const bucket = client.storage.from(AVATARS_BUCKET);

  const { error } = await bucket.upload(fileName, bytes, {
    contentType: 'image/jpeg',
    upsert: true,
  });

  if (error) throw error;

  return bucket.getPublicUrl(fileName).data.publicUrl;
}

async function deleteAvatarObject(
  client: SupabaseClient<Database>,
  url: string,
) {
  // Strip the cache-buster query string to recover the storage key.
  const fileName = url.split('/').pop()?.split('?')[0];
  if (!fileName) return;

  await client.storage.from(AVATARS_BUCKET).remove([fileName]);
}
