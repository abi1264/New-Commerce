'use client';

import { Button } from '../customer/components/UI/Button';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  // fetch profile...
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

        <p className="text-gray-500 mt-2">View your account information</p>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-blue-500 p-8 text-white">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full bg-white text-blue-500
                            flex items-center justify-center
                            text-3xl font-bold"
            >
              {user?.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user?.name}</h2>

              <p className="text-blue-100">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* user? Information */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">Full Name</p>

              <p className="mt-1 font-medium text-gray-800">{user?.name}</p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="mt-1 font-medium text-gray-800">{user?.email}</p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>

              <p className="mt-1 font-medium text-gray-800">{user?.phoneNo}</p>
            </div>

            {/* Role */}
            <div>
              <p className="text-sm text-gray-500">Account Type</p>

              <span
                className="inline-block mt-1 px-3 py-1
                               bg-blue-100 text-blue-700
                               rounded-full text-sm font-medium"
              >
                {user?.role}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8 pt-6 border-t">
            <Button
              title="Logout"
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-transform duration-200"
              onClick={() => {
                logout();
              }}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
