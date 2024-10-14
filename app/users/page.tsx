"use client";
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; profilePhoto: string | null }>({
    username: '',
    email: '',
    profilePhoto: null,
  });

  // Retrieve user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser({
        ...parsedUser,
        profilePhoto: storedProfilePhoto || null,
      });
    }
  }, []);

  // Handle profile photo change
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const photoUrl = reader.result as string;
        setUser((prevUser) => ({ ...prevUser, profilePhoto: photoUrl }));
        localStorage.setItem("profilePhoto", photoUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle saving updated user details
  const handleSaveChanges = () => {
    localStorage.setItem("user", JSON.stringify(user)); // Update localStorage with new user data
    alert("Profile updated successfully!");
  };

  // Handle input changes for username and email
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <>
        <Sidebar />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">User Profile</h2>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-6">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="h-24 w-24 rounded-full mb-4 object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-500 flex items-center justify-center mb-4">
              <span className="text-white">No Photo</span>
            </div>
          )}
          <label className="cursor-pointer text-sm bg-teal-600 text-white py-1 px-3 rounded-md hover:bg-teal-700 transition duration-200">
            Change Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </label>
        </div>

        {/* User Information */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="w-full py-3 bg-teal-600 text-white rounded hover:bg-teal-700 transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
