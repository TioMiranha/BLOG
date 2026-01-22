'use server';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuth = await verifyLoginSession();

  if (!isAuth) {
    return {
      error: 'Faça login em outra aba antes de salvar',
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }
  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }

    return {
      error: 'Erro desconhecido',
    };
  }

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts', 'max');
  revalidateTag(`post-${post.slug}`, 'max');

  return {
    error: '',
  };
}
