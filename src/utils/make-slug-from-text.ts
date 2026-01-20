import slugify from 'slugify';
import { makeRandomString } from './make-handle-string';

export const makeSlugFromText = (text: string) => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return `${slug}-${makeRandomString()}`;
};
