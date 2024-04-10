import { z } from 'zod';

export const FormSchema = z.object({
  email: z
    .string()
    .email('Input must be a valid email')
    .endsWith('@gmail.com', 'Provider must be a gmail'),
  username: z
    .string()
    .min(4, 'Username must be atleast 4 characters long')
    .max(10, 'Username must not exceed 10 characters long'),
});
export type FormDataTypes = z.infer<typeof FormSchema>;
