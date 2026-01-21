import { MenuAdmin } from '@/components/admin/Menu';
import { requireLoginSessionOrRedirect } from '@/lib/login/manage-login';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminPostsLayout({
  children,
}: Readonly<RootLayoutProps>) {
  await requireLoginSessionOrRedirect();

  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
