import { MenuAdmin } from '@/components/admin/Menu';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function AdminPostsLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
