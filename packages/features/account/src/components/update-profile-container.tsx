import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import { Tables, useUser } from '@kit/supabase';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  LoadingOverlay,
  onValidationErrors,
  Text,
  toast,
} from '@kit/ui';

import { useFetchAccount } from '../lib/hooks/use-fetch-profile';
import { useUpdateAccountDataMutation } from '../lib/hooks/use-update-account-mutation';
import { UpdateProfilePictureForm } from './update-profile-picture-form';

export function UpdateProfileContainer() {
  const { data: user } = useUser();
  const { data: accountData, isLoading, isError } = useFetchAccount(user?.id);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (isError || !accountData) {
    return <ErrorMessage />;
  }

  return (
    <View className={'flex-col justify-center gap-4'}>
      <UpdateProfilePictureContainer data={accountData} />
      <UpdateProfileForm data={accountData} />
    </View>
  );
}

function UpdateProfilePictureContainer(props: { data: Tables<'accounts'> }) {
  const userId = props.data.id;
  const pictureUrl = props.data.picture_url;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your profile picture</CardTitle>

        <CardDescription>
          Update your profile picture to make it easier for others to find you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <UpdateProfilePictureForm pictureUrl={pictureUrl} userId={userId} />
      </CardContent>
    </Card>
  );
}

function UpdateProfileForm(props: { data: Tables<'accounts'> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update your name</CardTitle>

        <CardDescription>
          Update your name to make it easier for others to find you.
        </CardDescription>
      </CardHeader>

      <CardContent className={'flex-col justify-center gap-4'}>
        <UpdateProfileNameForm data={props.data} />
      </CardContent>
    </Card>
  );
}

function UpdateProfileNameForm(props: { data: Tables<'accounts'> }) {
  const form = useForm({
    resolver: zodResolver(z.object({ name: z.string().min(2).max(255) })),
    defaultValues: {
      name: props.data.name,
    },
  });

  const mutation = useUpdateAccountDataMutation(props.data.id);

  return (
    <View className={'flex-col justify-center gap-4'}>
      <View>
        <Controller
          control={form.control}
          name={'name'}
          render={({ field }) => (
            <Input
              placeholder="Your name"
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
          disabled={mutation.isPending}
          onPress={form.handleSubmit(
            (data) => mutation.mutateAsync(data),
            onValidationErrors((message) => toast.error(message)),
          )}
        >
          <Text>Update your name</Text>
        </Button>
      </View>
    </View>
  );
}

function ErrorMessage() {
  return (
    <Alert>
      <AlertTitle>Sorry, something went wrong.</AlertTitle>

      <AlertDescription>
        We were unable to fetch your profile data. Please try again.
      </AlertDescription>
    </Alert>
  );
}
