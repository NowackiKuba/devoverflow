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
    .min(3, { message: 'Name should be at least 3 characters' })
    .max(20),
  username: z
    .string()
    .min(5, { message: 'Username should be at least 5 characters' })
    .max(32),
  portfolioLink: z.string().url(),
  location: z.string().max(30),
  bio: z
    .string()
    .min(30, { message: 'Bio should be at least 30 characters' })
    .max(150),
});
