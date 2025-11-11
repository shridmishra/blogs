export type Author = {
  handle: string;
  name: string;
  avatar?: string;
  bio: string;
};

export const authors: Record<string, Author> = {
  'jane-doe': {
    handle: 'jane-doe',
    name: 'Jane Doe',
    bio: 'Jane Doe is a front-end developer and technical writer specializing in TypeScript and React.',
  },
  'john-doe': {
    handle: 'john-doe',
    name: 'John Doe',
    bio: 'John Doe is a full-stack engineer who loves building scalable web applications with Next.js.',
  },

  'shridmishra': {
    handle: 'shridmishra',
    name: 'Shrid Mishra',
    bio: 'I am Batman',
    
  },
};
