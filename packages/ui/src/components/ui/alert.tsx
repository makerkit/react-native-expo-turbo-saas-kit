import { Children, isValidElement, useMemo, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '../../lib/utils';
import { Text } from './text';

type AlertProps = ViewProps & { children: ReactNode };
type AlertTitleProps = React.ComponentProps<typeof Text>;
type AlertDescriptionProps = React.ComponentProps<typeof Text>;
type AlertIconProps = React.ComponentProps<typeof View>;
type AlertActionsProps = React.ComponentProps<typeof View>;

function Alert({ children, className, ...props }: AlertProps) {
  const items = useMemo(() => Children.toArray(children), [children]);

  const icon = items.find((c) => isValidElement(c) && c.type === AlertIcon);
  const title = items.find((c) => isValidElement(c) && c.type === AlertTitle);
  const description = items.find(
    (c) => isValidElement(c) && c.type === AlertDescription,
  );
  const actions = items.find(
    (c) => isValidElement(c) && c.type === AlertActions,
  );

  return (
    <View
      className={cn(
        'border-border flex-col items-center justify-center gap-4 rounded-lg border p-8',
        className,
      )}
      {...props}
    >
      {icon}
      <View className="flex-col items-center gap-1">
        {title}
        {description}
      </View>
      {actions}
    </View>
  );
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <Text
      className={cn('text-center font-semibold', className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return (
    <Text
      className={cn('text-muted-foreground text-center text-sm', className)}
      {...props}
    />
  );
}

function AlertActions({ className, children, ...props }: AlertActionsProps) {
  return (
    <View className={cn('flex-row gap-4', className)} {...props}>
      {children}
    </View>
  );
}

function AlertIcon({ children, className }: AlertIconProps) {
  return <View className={className}>{children}</View>;
}

export { Alert, AlertActions, AlertDescription, AlertIcon, AlertTitle };
