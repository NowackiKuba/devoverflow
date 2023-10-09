import EditProfile from '@/components/forms/EditProfile';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Profile</h1>
      <div className='mt-11'>
        <EditProfile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default page;
