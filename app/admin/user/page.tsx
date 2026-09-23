'use client';

import { Button } from '../components/UI/Button';
import { UserTable } from './userTable';

import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();

  function handleAddUser() {
    console.log('AddUser Button clicked');
    router.push('/admin/user/create');
  }
  return (
    <div className="flex flex-col m-8 gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold uppercase">Users</h1>
          <p className="text-sm">Users Management Page</p>
        </div>
        <Button
          title="Add user"
          onClick={() => handleAddUser()}
          className="bg-blue-500 text-white rounded-md"
        />
      </div>
      <UserTable />
    </div>
  );
}
