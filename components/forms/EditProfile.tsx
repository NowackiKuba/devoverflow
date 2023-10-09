'use client';
import { userSchema } from '@/lib/validations';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions/user.actions';

interface Props {
  clerkId: string;
  user: string;
}

const EditProfile = ({ clerkId, user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: parsedUser.name || '',
      username: parsedUser.username || '',
      portfolioWebsite: parsedUser.portfolioLink || '',
      location: parsedUser.location || '',
      bio: parsedUser.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    setIsSubmitting(true);

    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(true);
    }
  }

  return (
    <Form {...form}>
      <form
        className='mt-9 flex w-full flex-col gap-9'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-3.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Name <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  placeholder='Your name'
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-2.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Username <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  placeholder='Your username'
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='portfolioWebsite'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-2.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Portfolio Link
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  type='url'
                  placeholder='Your portfolio link'
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-2.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Location
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Input
                  placeholder='Where do you live?'
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-2.5'>
              <FormLabel className='paragraph-semibold text-dark400_light800'>
                Bio <span className='text-primary-500'>*</span>
              </FormLabel>
              <FormControl className='mt-3.5'>
                <Textarea
                  placeholder="What's special about you?"
                  rows={5}
                  className='no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500' />
            </FormItem>
          )}
        ></FormField>
        <div className='mt-7 flex justify-end'>
          <Button
            className='primary-gradient w-fit !text-light-900'
            disabled={isSubmitting}
            type='submit'
          >
            {isSubmitting ? 'Submitting...' : 'Submit '}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfile;
