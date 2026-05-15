import { z } from 'zod';

export const EmailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const EmailPasswordSchema = EmailSchema.extend({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
