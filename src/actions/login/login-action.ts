'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      username: '',
      error: 'Login not allowed',
    };
  }

  await asyncDelay(5000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const username = formData.get('username')?.toString().trim() || '';
  const password = formData.get('username')?.toString().trim() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuario e a senha',
    };
  }

  // Aqui eu checcaria se o usuário existe na base de dados
  const isUserNameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (isUserNameValid || isPasswordValid) {
    return {
      username,
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);

  redirect('/admin/post');
}
