import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { useSupabase } from '@kit/supabase';

export const UpdatePasswordSchema = z
  .object({
    password: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password confirmation must be at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UpdatePasswordFormValues = z.infer<typeof UpdatePasswordSchema>;

export function useUpdatePassword() {
  const supabase = useSupabase();

  return useMutation({
    mutationFn: async (values: UpdatePasswordFormValues) => {
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        throw error;
      }
    },
  });
}
