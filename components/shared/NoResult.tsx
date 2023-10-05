import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const NoResult = () => {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      <Image
        src='/assets/images/light-illustration.png'
        width={270}
        height={200}
        alt='noresult'
        className='object-containt block dark:hidden'
      />
      <Image
        src='/assets/images/dark-illustration.png'
        width={270}
        height={200}
        alt='noresult'
        className='hidden object-contain dark:flex'
      />
      <h2 className='h2-bold text-dark200_light900 mt-8'>
        There&apos;s no question to show
      </h2>
      <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>
        Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡
      </p>
      <Link href='/'>
        <Button>Ask Question</Button>
      </Link>
    </div>
  );
};

export default NoResult;
