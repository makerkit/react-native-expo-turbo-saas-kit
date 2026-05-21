import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useSignUpWithEmailAndPassword } from '@kit/supabase';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Check,
  Input,
  onValidationErrors,
  Text,
  toast,
} from '@kit/ui';

import { useCreateDeepLink } from '../lib/deep-links';
import { EmailPasswordSchema } from '../lib/schema';

export function SignUpEmailPassword() {
  const form = useForm({
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpMutation = useSignUpWithEmailAndPassword({
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const deepLink = useCreateDeepLink();

  if (signUpMutation.isSuccess) {
    return <SuccessMessage />;
  }

  const onSubmit = form.handleSubmit(async (data) => {
    await signUpMutation.mutateAsync({
      email: data.email,
      password: data.password,
      emailRedirectTo: deepLink,
    });
  }, onValidationErrors((message) => toast.error(message)));

  return (
    <View className={'flex-col justify-center gap-4 p-8'}>
      <View>
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
        <Controller
          control={form.control}
          name={'password'}
          render={({ field }) => (
            <Input
              placeholder={'Password'}
              secureTextEntry
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
      </View>

      <View>
        <Button
          size={'lg'}
          disabled={signUpMutation.isPending}
          onPress={onSubmit}
        >
          <Text>Create Account</Text>
        </Button>
      </View>
    </View>
  );
}

function SuccessMessage() {
  return (
    <View>
      <Alert className={'m-4'}>
        <AlertIcon
          className={'rounded-full border-8 border-green-100 bg-green-500 p-2'}
        >
          <Check className={'h-14 w-14 text-white'} />
        </AlertIcon>

        <AlertTitle>We have sent you an email.</AlertTitle>

        <AlertDescription>
          Please verify your email address to complete your registration.
        </AlertDescription>
      </Alert>
    </View>
  );
}
