import { getQuestionById } from '@/lib/actions/question.actions';
import React from 'react';

const page = async ({ params }: { params: { questionId: string } }) => {
  const result = await getQuestionById({ questionId: params.questionId });
  return <div>{result?.question.title}</div>;
};

export default page;
