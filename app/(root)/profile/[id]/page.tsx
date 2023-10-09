import { getUserById, getUserStats } from '@/lib/actions/user.actions';
import { dateToMonthYear } from '@/lib/utils';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById({ userId: params.id });
  const { userId } = auth();
  if (!userId) return null;
  const userQuestions = await getUserStats(userId);
  console.log(userQuestions);

  return (
    <>
      <div className='mt-11 flex w-full flex-col'>
        <div className='flex gap-5'>
          <Image
            src={user.picture}
            alt='user'
            width={120}
            height={120}
            className='rounded-full object-contain'
          />
          <div className='flex-col'>
            <h2 className='h2-bold text-dark200_light800'>{user.name}</h2>
            <p className='paragraph-regular text-dark200_light800'>
              @{user.username}
            </p>

            <p className='mt-5 flex items-center gap-2 text-light-400'>
              <Image
                src='/assets/icons/calendar.svg'
                alt='calendar'
                height={20}
                width={20}
              />
              {dateToMonthYear(user.joinedAt)}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-24'>
        <h3 className='h3-semibold text-dark300_light700'>Stats</h3>
        <div className='mt-10 flex'></div>
      </div>
    </>
  );
};

export default page;
