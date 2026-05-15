import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

import { Icon, ToggleGroup, ToggleGroupItem } from '@kit/ui';

type Theme = 'light' | 'dark' | 'system';

export function ThemeModeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View className="flex justify-start">
      <ToggleGroup
        className="justify-start"
        type="single"
        variant="outline"
        value={colorScheme}
        onValueChange={async (value) => {
          if (!value) return;
          setColorScheme(value as Theme);
          await AsyncStorage.setItem('theme', value);
        }}
      >
        <ToggleGroupItem value="light" aria-label="Light Mode">
          <Icon as={Sun} className="size-6 text-foreground" />
        </ToggleGroupItem>

        <ToggleGroupItem value="dark" aria-label="Dark Mode">
          <Icon as={Moon} className="size-6 text-foreground" />
        </ToggleGroupItem>
      </ToggleGroup>
    </View>
  );
}
