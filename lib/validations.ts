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

export const userSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Name should be at least 5 characters' })
    .max(50),
  username: z
    .string()
    .min(5, { message: 'Username should be at least 5 characters' })
    .max(50),
  portfolioWebsite: z.string().url(),
  location: z
    .string()
    .min(5, { message: 'Location should be at least 5 characters' })
    .max(30),
  bio: z
    .string()
    .min(10, { message: 'Bio should be at least 10 characters' })
    .max(150),
});
