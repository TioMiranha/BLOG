import PostsListAdmin from '@/components/admin/PostsListsAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { findAllPostAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const is_dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post admin',
};

export default async function AdminPostPage() {
  const posts = await findAllPostAdmin();
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <PostsListAdmin />
    </Suspense>
  );
}
