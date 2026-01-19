'use client';
import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';

export function ManagePostForm() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText labelText='sua mae' placeholder='Digite o fodasse' />
        <InputText labelText='seilacaraio' placeholder='Digite o fodassenome' />
        <InputText
          disabled
          labelText='seilacaraio'
          placeholder='Digite o fodassenome'
          defaultValue='Ola mundo'
        />

        <InputCheckbox />

        <InputText
          disabled
          labelText='seilacaraio'
          placeholder='Digite o fodassenome'
        />

        <InputText
          disabled
          labelText='seilacaraio'
          placeholder='Digite o fodassenome'
          defaultValue='Ola mundo'
          readOnly
        />
      </div>
      <div className='mt-4'>
        <Button type='submit'>Enviar</Button>
      </div>
    </form>
  );
}
