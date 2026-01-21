'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageActionResult = {
  url: string;
  error: string;
};

const maxSize = Number(process.env.IMAGE_UPLOADER_MAX_SIZE) || 921600;

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => {
    return { url, error };
  };

  const isAuth = await verifyLoginSession();

  if (!isAuth) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  if (file.size > maxSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';

  const uploadsFullPath = resolve(process.cwd(), 'public', uploadDir);

  await mkdir(uploadsFullPath, { recursive: true });

  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadsFullPath, uniqueImageName);

  console.log(fileFullPath);

  await writeFile(fileFullPath, buffer);

  const imgServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

  const url = `${imgServerUrl} / ${uniqueImageName}`;
  //TODO: enviei o arquivo
  return makeResult({ url: url });
}
