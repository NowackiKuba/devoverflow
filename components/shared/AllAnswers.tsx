import React from 'react';
import Filter from './Filter';
import { getAnswers } from '@/lib/actions/answer.action';
import { AnswerFilters } from '@/constants/filters';
import Link from 'next/link';
import Image from 'next/image';
import { getTimestamp } from '@/lib/utils';
import ParseHTML from './ParseHTML';
import Votes from './search/Votes';

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const result = await getAnswers({ questionId });
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-between'>
        <h3 className='primary-text-gradient'>{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result.answers.map((answer) => (
          <article key={answer._id} className='light-border border-b py-10'>
            <div className='flex items-center justify-between'>
              <div className='mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className='flex flex-1 items-start gap-1 sm:items-center'
                >
                  {/* // TODO FIX BUG WITH IMAGE */}
                  <Image
                    src={answer.author.picture}
                    alt='profilephoto'
                    width={18}
                    height={18}
                    className='rounded-full object-cover max-sm:mt-0.5'
                  />
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <p className='body-semibold text-dark300_light700 '>
                      {answer.author.name}
                    </p>

                    <p className='small-regular text-light400_light500 ml-2 line-clamp-1'>
                      {' '}
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <Votes
                    type='Answer'
                    itemId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content}></ParseHTML>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
