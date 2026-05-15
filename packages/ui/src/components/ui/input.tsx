import { Platform, TextInput } from 'react-native';

import { cn } from '../../lib/utils';

// Kit extension: default autoCapitalize='none', autoCorrect=false
function Input({
  className,
  autoCapitalize = 'none',
  autoCorrect = false,
  ...props
}: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      className={cn(
        // Kit extension: native:h-12, native:text-lg, native:leading-[1.25]
        'dark:bg-input/30 border-input bg-background text-foreground native:h-12 native:text-lg native:leading-[1.25] flex h-10 w-full min-w-0 flex-row items-center rounded-md border px-3 py-1 text-base leading-5 shadow-sm shadow-black/5 sm:h-9',
        props.editable === false &&
          cn(
            'opacity-50',
            Platform.select({
              web: 'disabled:pointer-events-none disabled:cursor-not-allowed',
            }),
          ),
        Platform.select({
          web: cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground outline-none transition-[color,box-shadow] md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          ),
          // Kit extension: placeholder:text-muted-foreground (full opacity, not upstream's /50)
          native: 'placeholder:text-muted-foreground',
        }),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
