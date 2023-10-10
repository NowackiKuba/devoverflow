'use server';

import Answer from '../models/answer.model';
import Question from '../models/question.model';
import Tag from '../models/tag.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import { SearchParams } from './shared.types';

const SearchableTypes = ['question', 'answer', 'tag', 'user'];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDB();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: 'i' };

    let results = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchField: 'title',
        type: 'question',
      },
      {
        model: Answer,
        searchField: 'content',
        type: 'answer',
      },
      {
        model: Tag,
        searchField: 'name',
        type: 'tag',
      },
      {
        model: User,
        searchField: 'name',
        type: 'user',
      },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // Search across everything

      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === 'answer'
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === 'user'
                ? item.clerkId
                : type === 'answer'
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      // Search in the specified model type

      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error('Invalid search type');
      }

      const queryResults = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === 'answer'
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === 'user'
            ? item.clerkId
            : type === 'answer'
            ? item.question
            : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log('Error fetching global results', error);
    throw error;
  }
}
