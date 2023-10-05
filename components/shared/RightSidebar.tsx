import { PopularTags, TopQuestions } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const RightSidebar = () => {
  return (
    <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 h-screen w-[350px] flex-col justify-between overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h1 className='h3-bold text-dark300_light900'>Top Questions</h1>
        {TopQuestions.map((question) => (
          <div
            className='mt-6 flex flex-row items-center justify-between gap-6'
            key={question}
          >
            <p className='text-sm font-medium text-dark-300 dark:text-slate-200'>
              {question}
            </p>
            <Link href='/'>
              <Image
                alt='arrow'
                src='/assets/icons/chevron-right.svg'
                height={20}
                width={20}
                className='text-dark-500'
              />
            </Link>
          </div>
        ))}
      </div>
      <div className='mt-24'>
        <h1 className='h3-bold text-dark300_light900'>Popular Tags</h1>
        <div className='mt-7 flex flex-col gap-4'>
          {PopularTags.map((tag) => (
            <div
              className=' flex flex-col items-start justify-between gap-3'
              key={tag.name}
            >
              <div className='flex w-full flex-row justify-between'>
                <div className='flex flex-row justify-between rounded-md bg-light-800 px-4 py-2 shadow dark:bg-dark-300'>
                  <div className='text-[10px] font-medium uppercase leading-[13px] text-light-500'>
                    {tag.name}
                  </div>
                </div>
                <div className=' text-xs font-medium leading-none text-dark-200 dark:text-slate-200'>
                  {tag.count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
