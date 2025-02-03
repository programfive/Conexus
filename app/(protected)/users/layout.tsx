import { getUsers } from '@/actions/users';
import { UserList } from './components/user-list';
import { Sidebar } from '@/components/utils/sidebar/sidebar';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await getUsers();
  return (
    <Sidebar>
        <div className="h-full">
            <UserList users={users!} />
            {children}
        </div>
     </Sidebar>
  );
}
