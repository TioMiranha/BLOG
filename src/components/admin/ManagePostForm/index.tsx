'use client';
import { createPostAction } from '@/actions/posts/create-post-action';
import { updatePostAction } from '@/actions/posts/update-post-action';
import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkDownEditor';
import { makePartialPublicPost, PublicPost } from '@/dto/post/dto';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ImageUploader } from '../ImageUploader';

type ManagePostFormUpdateProps = {
  mode: 'update';
  publicPost?: PublicPost;
};

type ManagePostFormCreateProps = {
  mode: 'create';
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps;

export function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get('created');
  const router = useRouter();

  let publicPost;

  if (mode === 'update') {
    publicPost = props.publicPost;
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost),
    errors: [],
  };

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (created === '1') {
      toast.dismiss();
      toast.success('Post criado com sucesso!');
      const url = new URL(window.location.href);
      url.searchParams.delete(created);
      router.replace(url.toString());
    }
  }, [created, router]);

  const { formState } = state;
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          type='text'
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='SLUG'
          name='slug'
          placeholder='Slug gerado automaticamente'
          type='text'
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          placeholder='Digite o nome do autor'
          type='text'
          disabled={isPending}
          defaultValue={formState.author}
        />

        <InputText
          labelText='Titulo'
          name='titulo'
          placeholder='Digite o titulo'
          type='text'
          disabled={isPending}
          defaultValue={formState.title}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          placeholder='Digite o resumo'
          type='text'
          disabled={isPending}
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />

        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImgUrl'
          placeholder='Digite a url da imagem'
          type='text'
          disabled={isPending}
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          disabled={isPending}
          defaultChecked={formState.published}
        />

        <div className='mt-4'>
          <Button type='submit' disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}
