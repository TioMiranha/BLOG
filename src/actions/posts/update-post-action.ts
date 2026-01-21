'use server';

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from '@/dto/post/dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { makeRandomString } from '@/utils/make-handle-string';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  const isAuth = await verifyLoginSession();

  if (!isAuth) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar'],
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts', 'max');
  redirect(`/post-${post.slug}`);

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: makeRandomString(),
  };
}
