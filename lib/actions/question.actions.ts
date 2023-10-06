'use server';

import Tag from '../models/tag.model';
import Question from '../models/question.model';
import { connectToDB } from '../mongoose';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';

export async function getQuestions(params: GetQuestionsParams) {
  const { page = 1, pageSize = 10, searchQuery = '', filter = '' } = params;
}

export async function createQuestion(params: CreateQuestionParams) {
  // es-lint-disable-next-line
  try {
    connectToDB();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({ title, content, author });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    // if error throw error
  }
}
