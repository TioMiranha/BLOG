import { findAllPostAdmin } from '@/lib/post/queries/admin';
import clsx from 'clsx';
import Link from 'next/link';
import { DeletePostButton } from '../admin/DeletePostButton';

export default async function PostsListAdmin() {
  const posts = await findAllPostAdmin();
  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            className={clsx(
              'py-2 px-2',
              !post.published && 'bg-slate-300',
              'flex gap-2 items-center justify-between',
            )}
            key={post.id}
          >
            <Link href={`/admin/post/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className='text-xs text-slate-600 italic'>
                (Não publlicado)
              </span>
            )}
            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}

      <div
        className={clsx(
          'fixed z-50 inset-0 bg-black/50 backdrop-blur-xs',
          'flex items-center justify-center',
        )}
      >
        <div
          className={clsx(
            'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
            'flex-col gap-6',
            'shadow-lg shadow-black/30 text-center',
          )}
        >
          <h3 className='text-xl font-extrabold'>Titulo do dialog</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit ea
            repudiandae sunt minima et quam sequi, optio, soluta praesentium
            libero dolores molestias totam saepe laudantium corporis eligendi
            beatae, inventore quia.
          </p>
          <div className='flex items-center justify-around'>
            <button
              className={clsx(
                'bg-slate-300 hover:bg-slate-400 transition text-slate-950',
                'flex items-center justify-center',
                'py-2 px-4 rounded-lg cursor-pointer',
              )}
              autoFocus
            >
              cancelar
            </button>
            <button
              className={clsx(
                'bg-blue-500 hover:bg-blue-600 transition text-bule-50',
                'flex items-center justify-center',
                'py-2 px-4 rounded-lg cursor-pointer',
              )}
            >
              jóia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
