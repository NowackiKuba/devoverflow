import { SidebarLink } from '@/types';

export const themes = [
  { value: 'light', label: 'Light', icon: '/assets/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/assets/icons/moon.svg' },
  { value: 'system', label: 'System', icon: '/assets/icons/computer.svg' },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/assets/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/assets/icons/users.svg',
    route: '/community',
    label: 'Community',
  },
  {
    imgURL: '/assets/icons/star.svg',
    route: '/collection',
    label: 'Collections',
  },
  {
    imgURL: '/assets/icons/suitcase.svg',
    route: '/jobs',
    label: 'Find Jobs',
  },
  {
    imgURL: '/assets/icons/tag.svg',
    route: '/tags',
    label: 'Tags',
  },
  {
    imgURL: '/assets/icons/user.svg',
    route: '/profile',
    label: 'Profile',
  },
  {
    imgURL: '/assets/icons/question.svg',
    route: '/ask-question',
    label: 'Ask a question',
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const TopQuestions = [
  'Best practices for data fetching in a Next.js application with Server Side Rendering (SSR)?',
  'Can I get the course for free?',
  'Redux Toolkit Not Updating State as Expected',
  'Async/Await Fuynction Not Handling Errors Properly',
  'How do I use express as a custom server in NextJS?',
];

export const PopularTags = [
  {
    name: 'NEXTJS',
    count: 6,
  },
  {
    name: 'REACT',
    count: 4,
  },
  {
    name: 'TEST',
    count: 3,
  },
  {
    name: 'NEXTJS',
    count: 3,
  },
  {
    name: 'CSS',
    count: 3,
  },
];
