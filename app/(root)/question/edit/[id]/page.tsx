import Question from '@/components/forms/NewQuestion';
import { getQuestionById } from '@/lib/actions/question.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const mongoUser = await getUserById({ userId });

  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Edit Question</h1>

      <div className='mt-9'>
        <Question
          type='Edit'
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result)}
        />
      </div>
    </>
  );
};

export default Page;
