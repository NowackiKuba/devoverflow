'use server';

import { FilterQuery } from 'mongoose';
import Question from '../models/question.model';
import Tag, { ITag } from '../models/tag.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDB();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // Find interactions for the user and group by tags

    // TODO Interaction model

    return [
      { _id: '1', name: 'tag1' },
      { _id: '2', name: 'tag2' },
      { _id: '3', name: 'tag3' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDB();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params;

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log('Error fetching tags:', error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDB();
    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id name' },
      ],
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
