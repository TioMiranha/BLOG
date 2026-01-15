import { postRepository } from '@/repositories/post/json-post-repositry';
import { cache } from 'react';

export const findAllPublicPosts = cache(
  async () => await postRepository.findAllPublic(),
);
