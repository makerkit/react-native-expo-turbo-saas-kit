import type { FieldErrors } from 'react-hook-form';

export function onValidationErrors(
  handler: (firstMessage: string, errors: FieldErrors) => void,
) {
  return (errors: FieldErrors) => {
    const first = Object.values(errors).find(
      (e) => e && 'message' in e && e.message,
    );
    const firstMessage =
      first && 'message' in first && first.message ? String(first.message) : '';
    handler(firstMessage, errors);
  };
}
