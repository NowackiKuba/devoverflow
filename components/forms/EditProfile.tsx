'use client';
import { userSchema } from '@/lib/validations';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { type } from 'os';
import { Button } from '../ui/button';

const EditProfile = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      portfolioLink: '',
      location: '',
      bio: '',
    },
  });
  return (
    <div className='mt-11'>
      <Form {...form}>
        <form className='flex flex-col gap-10'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-2.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Name <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
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
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name='portfolioLink'
            render={({ field }) => (
              <FormItem className='flex w-full flex-col gap-2.5'>
                <FormLabel className='paragraph-semibold text-dark400_light800'>
                  Portfolio Link <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    placeholder='Your portfolio link'
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
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
                  Location <span className='text-primary-500'>*</span>
                </FormLabel>
                <FormControl className='mt-3.5'>
                  <Input
                    placeholder='Where do you live?'
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
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
                    className='no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-500' />
              </FormItem>
            )}
          ></FormField>
          <Button
            className='primary-gradient right-0 w-fit !text-light-900'
            disabled={isSubmitting}
            type='submit'
          >
            {isSubmitting ? 'Submitting...' : 'Submit '}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfile;
