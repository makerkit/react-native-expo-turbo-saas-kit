import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Toaster } from '@kit/ui';

import { GlobalThemeProvider } from './theme-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GlobalThemeProvider>
          {children}

          <Toaster
            position="bottom-center"
            offset={40}
            swipeToDismissDirection="left"
            duration={3500}
            theme="system"
            enableStacking={Platform.OS === 'ios'}
          />
        </GlobalThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
