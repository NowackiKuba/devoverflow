import Metric from '@/components/shared/Metric';
import ParseHTML from '@/components/shared/ParseHTML';
import { getQuestionById } from '@/lib/actions/question.actions';
import { formatNumberWithExtension, getTimestamp } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = async ({ params }: { params: { questionId: string } }) => {
  const result = await getQuestionById({ questionId: params.questionId });
  return (
    <>
      <div className='flex-start w-full flex-col'>
        <div className='flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2'>
          <Link
            href={`/profile/${result.author.clerkId}`}
            className='flex items-center justify-start gap-1'
          >
            <Image
              src={result.author.picture}
              alt='profilephoto'
              className='rounded-full'
              width={22}
              height={22}
            />
            <p className='paragraph-semibold text-dark300_light700'>
              {result.author.name}
            </p>
          </Link>
          <div className='flex justify-end'>VOTING</div>
        </div>
        <h2 className='h2-semibold text-dark200_light900 mt-3.5 w-full text-left'>
          {result.title}
        </h2>
      </div>

      <div className='mb-8 mt-5 flex flex-wrap gap-4'>
        <Metric
          imgUrl='/assets/icons/clock.svg'
          alt='clock icon'
          value={` asked ${getTimestamp(result.createdAt)}`}
          title='Asked'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/message.svg'
          alt='Answers'
          value={formatNumberWithExtension(result.answers.length)}
          title=' Answers'
          textStyles='small-medium text-dark400_light800'
        />
        <Metric
          imgUrl='/assets/icons/eye.svg'
          alt='views'
          value={formatNumberWithExtension(result.views)}
          title=' Views'
          textStyles='small-medium text-dark400_light800'
        />
      </div>

      <ParseHTML data={result.content} />
    </>
  );
};

export default page;
