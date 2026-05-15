import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useRequestResetPassword } from '@kit/supabase';
import { Button, Input, onValidationErrors, Text, toast } from '@kit/ui';

import { EmailSchema } from '../lib/schema';

export function EmailPasswordResetForm() {
  const form = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordResetMutation = useRequestResetPassword();

  return (
    <View className={'flex-col justify-center gap-8 p-8'}>
      <View className={'h-16'}>
        <Text>Email</Text>

        <Controller
          control={form.control}
          name={'email'}
          render={({ field }) => (
            <Input
              inputMode={'email'}
              placeholder="Email"
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
      </View>

      <View>
        <Button
          className={'w-full'}
          onPress={form.handleSubmit((data) => {
            passwordResetMutation.mutate({
              email: data.email,
              redirectTo: '/',
            });

            toast.success('We sent you an email to reset your password.');
          }, onValidationErrors((message) => toast.error(message)))}
        >
          <Text>Request Password Reset</Text>
        </Button>
      </View>
    </View>
  );
}
