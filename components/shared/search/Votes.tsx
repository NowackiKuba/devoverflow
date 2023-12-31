'use client';
import {
  downvoteQuestion,
  upvoteQuestion,
} from '@/lib/actions/question.actions';
import { formatNumberWithExtension } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { toggleSaveQuestion } from '@/lib/actions/user.actions';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const handleVote = async (action: string) => {
    if (!userId) {
      return null;
    }

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
        if (hasUpvoted) {
          toast({
            title: 'Upvote removed 😐',
          });
        } else {
          toast({
            title: 'Hurra 🥳',
            description: 'Successfully upvoted 💖',
          });
        }
      } else if (type === 'Answer') {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
        if (hasUpvoted) {
          toast({
            title: 'Upvote removed 😐',
          });
        } else {
          toast({
            title: 'Hurra 🥳',
            description: 'Successfully upvoted 💖',
          });
        }
      }
      return null;
    }
    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });
        if (hasDownvoted) {
          toast({
            title: 'Downvote removed 💖',
          });
        } else {
          toast({
            title: 'Successfully downvoted 😐',
          });
        }
      } else if (type === 'Answer') {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted: hasUpvoted,
          hasdownVoted: hasDownvoted,
          path: pathname,
        });

        if (hasDownvoted) {
          toast({
            title: 'Downvote removed 💖',
          });
        } else {
          toast({
            title: 'Successfully downvoted 😐',
          });
        }
      }
      return null;
    }
  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [itemId, userId, pathname, router]);
  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={
              hasUpvoted
                ? '/assets/icons/upvoted.svg'
                : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt='upvote'
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatNumberWithExtension(upvotes)}
            </p>
          </div>
          <Image
            src={
              hasDownvoted
                ? '/assets/icons/downvoted.svg'
                : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt='downvote'
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatNumberWithExtension(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === 'Question' && (
        <Image
          src={
            hasSaved
              ? '/assets/icons/star-filled.svg'
              : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt='star'
          className='cursor-pointer'
          onClick={() => handleSave()}
        />
      )}
    </div>
  );
};

export default Votes;
