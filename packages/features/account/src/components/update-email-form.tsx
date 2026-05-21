import { zodResolver } from '@hookform/resolvers/zod';
import * as Linking from 'expo-linking';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useUpdateUser } from '@kit/supabase';
import { Button, Input, onValidationErrors, Text, toast } from '@kit/ui';

import { UpdateUserSchema } from '../lib/hooks/use-update-user';

export function UpdateEmailForm() {
  const updateEmailMutation = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <View className="flex flex-col gap-4">
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <Input
            inputMode={'email'}
            placeholder="Email"
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
          />
        )}
      />

      <Button
        disabled={updateEmailMutation.isPending}
        onPress={form.handleSubmit((data) => {
          updateEmailMutation.mutate(
            { ...data, redirectTo: Linking.createURL('auth/callback') },
            {
              onSuccess: () => {
                toast.success('Email updated successfully');
                form.reset();
              },
              onError: (error) => {
                toast.error(error.message || 'Something went wrong');
              },
            },
          );
        }, onValidationErrors((message) => toast.error(message)))}
      >
        <Text>
          {updateEmailMutation.isPending ? 'Updating...' : 'Update Email'}
        </Text>
      </Button>
    </View>
  );
}
