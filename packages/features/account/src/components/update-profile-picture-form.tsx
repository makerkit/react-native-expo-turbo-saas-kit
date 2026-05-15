import { useState } from 'react';

import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Image, View } from 'react-native';

import { Button, Text, toast } from '@kit/ui';

import { useUpdateAvatar } from '../lib/hooks/use-update-avatar';

const MAX_AVATAR_WIDTH = 512;
const JPEG_QUALITY = 0.8;

export function UpdateProfilePictureForm(props: {
  pictureUrl: string | null;
  userId: string;
}) {
  return (
    <View className="flex-col justify-center gap-4">
      <PickImageButton userId={props.userId} pictureUrl={props.pictureUrl} />
    </View>
  );
}

function ImagePreview(props: { uri: string }) {
  return (
    <View>
      <Image className="h-20 w-20 rounded-full" source={{ uri: props.uri }} />
    </View>
  );
}

function PickImageButton(props: { userId: string; pictureUrl: string | null }) {
  const [isBusy, setIsBusy] = useState(false);
  const updateAvatar = useUpdateAvatar(props.userId);

  const pickImage = async () => {
    setIsBusy(true);
    let toastId: string | number | undefined;

    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        toast.error(
          'Photo library access is required to set a profile picture.',
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled) return;
      const asset = result.assets[0];
      if (!asset) return;

      toastId = toast.loading('Uploading profile picture…');

      // Client-side resize so avatars stay small regardless of source resolution.
      const ref = await ImageManipulator.manipulate(asset.uri)
        .resize({ width: MAX_AVATAR_WIDTH })
        .renderAsync();
      const manipulated = await ref.saveAsync({
        compress: JPEG_QUALITY,
        format: SaveFormat.JPEG,
      });

      await updateAvatar.mutateAsync({
        uri: manipulated.uri,
        previousPictureUrl: props.pictureUrl,
      });
      toast.success('Profile picture updated', { id: toastId });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to upload picture';
      toast.error(message, toastId ? { id: toastId } : undefined);
    } finally {
      setIsBusy(false);
    }
  };

  const clearImage = async () => {
    setIsBusy(true);
    const toastId = toast.loading('Removing profile picture…');

    try {
      await updateAvatar.mutateAsync({
        uri: null,
        previousPictureUrl: props.pictureUrl,
      });
      toast.success('Profile picture removed', { id: toastId });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to remove picture';
      toast.error(message, { id: toastId });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <View className="flex-col justify-center gap-4">
      {props.pictureUrl ? <ImagePreview uri={props.pictureUrl} /> : null}

      <Button size="lg" variant="outline" disabled={isBusy} onPress={pickImage}>
        {isBusy ? (
          <ActivityIndicator />
        ) : (
          <Text>
            {props.pictureUrl
              ? 'Change profile picture'
              : 'Pick a new profile picture'}
          </Text>
        )}
      </Button>

      {props.pictureUrl ? (
        <Button variant="ghost" disabled={isBusy} onPress={clearImage}>
          {isBusy ? <ActivityIndicator /> : <Text>Remove picture</Text>}
        </Button>
      ) : null}
    </View>
  );
}
