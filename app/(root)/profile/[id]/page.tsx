import { getUserInfo } from '@/lib/actions/user.actions';
import { dateToMonthYear } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { URLProps } from '@/types';
import { SignedIn, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileLink from '@/components/shared/ProfileLink';
import Stats from '@/components/shared/Stats';
import QuestionsTab from '@/components/shared/QuestionsTab';
import AnswersTab from '@/components/shared/AnswersTab';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params, searchParams }: URLProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const userInfo = await getUserInfo({ userId: id });

  return {
    title: `${userInfo?.user.username} | DevOverflow`,
  };
}

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getUserInfo({ userId: params.id });
  const { userId: clerkId } = auth();

  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Image
            src={result?.user.picture}
            alt='user'
            width={140}
            height={140}
            className='rounded-full object-contain'
          />
          <div className='mt-3'>
            <h2 className='h2-bold text-dark100_light900'>
              {result?.user.name}
            </h2>
            <p className='paragraph-regular text-dark200_light800'>
              @{result?.user.username}
            </p>

            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              {result?.user.portfolioWebsite && (
                <>
                  <ProfileLink
                    imgUrl='/assets/icons/link.svg'
                    title={result.user.portfolioWebsite}
                    href={result.user.portfolioWebsite}
                  />
                </>
              )}
              {result?.user.location && (
                <>
                  <ProfileLink
                    imgUrl='/assets/icons/location.svg'
                    title={result.user.location}
                  />
                </>
              )}
              <ProfileLink
                imgUrl='/assets/icons/calendar.svg'
                title={dateToMonthYear(result?.user.joinedAt)}
              />
            </div>
            {result?.user.bio && (
              <p className='paragraph-regular text-dark400_light800 mt-8'>
                {result.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <SignedIn>
            {clerkId === result?.user.clerkId && (
              <Link href='/profile/edit'>
                <Button className='paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3'>
                  Edit profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        questions={result!.totalQuestions}
        answers={result!.totalAnswers}
        badges={result!.badgeCounts}
        reputation={result!.reputation}
      />
      <div className='mt-10 flex gap-10'>
        <Tabs defaultValue='top-posts' className='flex-1'>
          <TabsList className='background-light800_dark400 min-h-[42px] p-1'>
            <TabsTrigger value='top-posts' className='tab'>
              Top Posts
            </TabsTrigger>
            <TabsTrigger value='answers' className='tab'>
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='top-posts'
            className='mt-5 flex w-full flex-col gap-6'
          >
            <QuestionsTab
              userId={result?.user._id}
              searchParams={searchParams}
              clerkId={clerkId!}
            />
          </TabsContent>
          <TabsContent
            value='answers'
            className='mt-5 flex w-full flex-col gap-6'
          >
            {' '}
            <AnswersTab
              userId={result?.user._id}
              searchParams={searchParams}
              clerkId={clerkId!}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default page;
