import { cn } from '../../lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Text as RNText, type Role } from 'react-native';

const textVariants = cva(
  cn(
    'text-foreground text-base',
    Platform.select({
      web: 'select-text',
    })
  ),
  {
    variants: {
      variant: {
        default: '',
        // Kit extension: drop text-center
        h1: cn(
          'text-4xl font-extrabold tracking-tight',
          Platform.select({ web: 'scroll-m-20 text-balance' })
        ),
        h2: cn(
          'border-border border-b pb-2 text-3xl font-semibold tracking-tight',
          Platform.select({ web: 'scroll-m-20 first:mt-0' })
        ),
        h3: cn('text-2xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        h4: cn('text-xl font-semibold tracking-tight', Platform.select({ web: 'scroll-m-20' })),
        p: 'mt-3 leading-7 sm:mt-6',
        blockquote: 'mt-4 border-l-2 pl-3 italic sm:mt-6 sm:pl-6',
        code: cn(
          'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
        ),
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-muted-foreground text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type TextVariantProps = VariantProps<typeof textVariants>;

type TextVariant = NonNullable<TextVariantProps['variant']>;

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  blockquote: Platform.select({ web: 'blockquote' as Role }),
  code: Platform.select({ web: 'code' as Role }),
};

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  asChild = false,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof RNText> &
  React.RefAttributes<typeof RNText> &
  TextVariantProps & {
    asChild?: boolean;
  }) {
  const textClass = React.useContext(TextClassContext);
  const Component = asChild ? Slot : RNText;
  return (
    <Component
      className={cn(textVariants({ variant }), textClass, className)}
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  );
}

// Shorthand wrappers around <Text variant="X" /> for ergonomic JSX usage.
// Kit-extension on top of upstream RNR — replaces the deprecated `typography.tsx`.
type TextShorthandProps = Omit<React.ComponentProps<typeof Text>, 'variant'>;

const H1 = (props: TextShorthandProps) => <Text variant="h1" {...props} />;
const H2 = (props: TextShorthandProps) => <Text variant="h2" {...props} />;
const H3 = (props: TextShorthandProps) => <Text variant="h3" {...props} />;
const H4 = (props: TextShorthandProps) => <Text variant="h4" {...props} />;
const P = (props: TextShorthandProps) => <Text variant="p" {...props} />;
const BlockQuote = (props: TextShorthandProps) => <Text variant="blockquote" {...props} />;
const Code = (props: TextShorthandProps) => <Text variant="code" {...props} />;
const Lead = (props: TextShorthandProps) => <Text variant="lead" {...props} />;
const Large = (props: TextShorthandProps) => <Text variant="large" {...props} />;
const Small = (props: TextShorthandProps) => <Text variant="small" {...props} />;
const Muted = (props: TextShorthandProps) => <Text variant="muted" {...props} />;

export {
  BlockQuote,
  Code,
  H1,
  H2,
  H3,
  H4,
  Large,
  Lead,
  Muted,
  P,
  Small,
  Text,
  TextClassContext,
};
