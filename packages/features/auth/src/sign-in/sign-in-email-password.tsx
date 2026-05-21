import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useSignInWithEmailPassword } from '@kit/supabase';
import {
  Alert,
  AlertActions,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Input,
  onValidationErrors,
  Text,
  toast,
  X,
} from '@kit/ui';

import { EmailPasswordSchema } from '../lib/schema';
import { AuthError } from '../shared/auth-error';

export function SignInEmailPassword() {
  const form = useForm({
    resolver: zodResolver(EmailPasswordSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = useSignInWithEmailPassword();

  if (signIn.error) {
    return (
      <View className={'flex-col justify-center'}>
        <ErrorMessage error={signIn.error} onReset={() => signIn.reset()} />
      </View>
    );
  }

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
              secureTextEntry
              placeholder={'Password'}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />

        <Link className={'my-4'} href="/auth/password-reset">
          <Text className={'text-muted-foreground text-sm'}>
            Forgot your password?
          </Text>
        </Link>
      </View>

      <View>
        <Button
          size={'lg'}
          className={'w-full'}
          disabled={signIn.isPending}
          onPress={form.handleSubmit((data) => {
            signIn.mutate({
              email: data.email,
              password: data.password,
            });
          }, onValidationErrors((message) => toast.error(message)))}
        >
          <Text>Sign in</Text>
        </Button>
      </View>
    </View>
  );
}

function ErrorMessage(props: { error: unknown; onReset: () => void }) {
  return (
    <Alert className={'m-4'}>
      <AlertIcon className="rounded-full border-8 border-red-100 bg-red-500 p-2">
        <X className={'h-14 w-14 text-white'} />
      </AlertIcon>

      <AlertTitle>Sorry, we couldn't sign you in.</AlertTitle>

      <AlertDescription>
        <AuthError error={props.error} />
      </AlertDescription>

      <AlertActions>
        <Button className={'mx-4'} variant={'outline'} onPress={props.onReset}>
          <Text>Try again</Text>
        </Button>
      </AlertActions>
    </Alert>
  );
}
