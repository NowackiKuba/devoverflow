import { TopQuestions, PopularTags } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import RenderTag from './RenderTag';

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen w-[350px] flex-col justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark300_light900'>Top Questions</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {TopQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className='flex cursor-pointer items-center justify-between gap-7'
            >
              <p className='body-medium text-dark500_light700'>
                {question.title}
              </p>
              <Image
                src='/assets/icons/chevron-right.svg'
                alt='chev'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-16'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {PopularTags.map((tag) => (
            <RenderTag
              totalQuestions={tag.totalQuestions}
              name={tag.name}
              _id={tag._id}
              showCount
              key={tag._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;