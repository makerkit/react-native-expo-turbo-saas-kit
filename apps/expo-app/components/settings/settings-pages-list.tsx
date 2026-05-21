import React from 'react';

import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { FlatList, View } from 'react-native';

import { Icon, Text } from '@kit/ui';

import { SignOutButton } from './sign-out-button';

type Page = {
  name: string;
  title: string;
  href: React.ComponentProps<typeof Link>['href'];
};

const pages: Page[] = [
  {
    name: 'application',
    title: 'Application',
    href: '/settings/application' as const,
  },
  {
    name: 'profile',
    title: 'Profile',
    href: '/settings/profile' as const,
  },
  {
    name: 'account',
    title: 'Account',
    href: '/settings/account' as const,
  },
];

export function SettingsPagesList() {
  return (
    <View className={'h-full w-full flex-1 flex-col space-y-8 p-4'}>
      <FlatList
        data={pages}
        ItemSeparatorComponent={() => (
          <View className={'h-px w-full bg-border'} />
        )}
        renderItem={({ item }) => (
          <Link className={'h-14'} href={item.href}>
            <View
              className={'h-full w-full flex-row items-center justify-between'}
            >
              <Text className={'text-lg'}>{item.title}</Text>
              <Icon as={ChevronRight} className="size-5 text-muted-foreground" />
            </View>
          </Link>
        )}
      />

      <SignOutButton />
    </View>
  );
}
