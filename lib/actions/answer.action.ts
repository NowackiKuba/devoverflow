import { revalidatePath } from 'next/cache';
import Answer from '../models/answer.model';
import Question from '../models/question.model';
import { connectToDB } from '../mongoose';
import { CreateAnswerParams } from './shared.types';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDB();
    const { content, author, question, path } = params;

    const newAnswer = new Answer({ content, author, question });

    // Add answer to the questions
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction...

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
