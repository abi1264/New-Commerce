'use client';
import Link from 'next/link';
import { Button } from '../components/UI/Button';
import { useEffect, useState } from 'react';
import { Dialog } from '../components/UI/dialog';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  whatsApp: string;
  isVerified: boolean;
  address: string;
  phoneNo: string;
};
export function UserTable() {
  const [showDialog, setShowDialog] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/user', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  //open dialog
  function handleDeleteClick(id: number) {
    setSelectedUserId(id);
    setShowDialog(true);
  }

  //Actually delete the User
  async function handleDelete() {
    if (selectedUserId === null) return;
    const response = await fetch(
      `http://localhost:3000/user/${selectedUserId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );
    if (!response.ok) {
      console.error('Failed to delete user');
      return;
    }

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUserId),
    );
    setShowDialog(false);
    alert('User Deleted Successfully !');
  }

  return (
    <>
      <table className="w-full border-3 border-black">
        <thead>
          <tr>
            <th className=" border-black p-2 border-3">ID</th>
            <th className=" border-black p-2 border-3">Name</th>
            <th className=" border-black p-2 border-3">Email</th>
            <th className=" border-black p-2 border-3">WhatsApp</th>
            <th className=" border-black p-2 border-3">Phone</th>
            <th className=" border-black p-2 border-3">Address</th>
            <th className=" border-black p-2 border-3">Role</th>
            <th className=" border-black p-2 border-3">Approval Status</th>
            <th className=" border-black p-2 border-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-3 border-black p-2">{user.id}</td>
              <td className="border-3 border-black p-2">{user.name}</td>
              <td className="border-3 border-black p-2">{user.email}</td>
              <td className="border-3 border-black p-2">{user.whatsApp}</td>
              <td className="border-3 border-black p-2">{user.phoneNo}</td>
              <td className="border-3 border-black p-2">{user.address}</td>
              <td className="border-3 border-black p-2">{user.role}</td>
              <td className="border-3 border-black p-2">
                {user.isVerified ? 'Yes' : 'No'}
              </td>

              <td className="border-3 border-black p-2">
                <div className="flex gap-6">
                  <Link href={`/admin/user/edit/${user.id}`}>
                    <Button title="Edit" className="bg-blue-500 text-white" />
                  </Link>
                  <Button
                    title="Delete"
                    className="bg-red-500 text-white"
                    onClick={(e) => handleDeleteClick(user.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Dialog
          title="Delete User"
          description="Are you sure want to delete this user?"
          onConfirm={handleDelete}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </>
  );
}
