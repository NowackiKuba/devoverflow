'use server';
import { revalidatePath } from 'next/cache';
import Answer from '../models/answer.model';
import Question from '../models/question.model';
import { connectToDB } from '../mongoose';
import { CreateAnswerParams, GetAnswersParams } from './shared.types';

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDB();

    const { content, author, question, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    // Add the answer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDB();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picutre')
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
