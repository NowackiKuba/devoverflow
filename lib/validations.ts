import * as z from 'zod';

export const questionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title should be minimum 5 characters' })
    .max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const AnswerSchema = z.object({
  answer: z.string().min(100),
});
