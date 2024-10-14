"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar";

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([
    {
      user: "John Doe",
      position: "Frontend Developer",
      date: "Sep 24, 2024",
      status: "Pending",
    },
    {
      user: "Jane Smith",
      position: "SQL Developer",
      date: "Sep 30, 2024",
      status: "Approved",
    },
  ]);

  const handleEdit = (index: number) => {
    const requestToEdit = pendingRequests[index];
    // Logic to handle editing (e.g., open modal, update fields, etc.)
    console.log("Edit request:", requestToEdit);
  };

  const handleDelete = (index: number) => {
    const updatedRequests = pendingRequests.filter((_, i) => i !== index);
    setPendingRequests(updatedRequests);
  };

  return (
    <> <Sidebar />
    
   
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-2">Total Users</h2>
            <p className="text-gray-600">Number of registered users</p>
            <h3 className="text-3xl font-bold mt-4">1,234</h3>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-2">Interviews Today</h2>
            <p className="text-gray-600">Scheduled interviews for today</p>
            <h3 className="text-3xl font-bold mt-4">15</h3>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-2">Pending Approvals</h2>
            <p className="text-gray-600">
              Interview requests awaiting approval
            </p>
            <h3 className="text-3xl font-bold mt-4">7</h3>
          </div>
        </div>
        <div className="bg-gray-200 p-6 rounded-md">
          <h2 className="text-lg font-medium mb-4">
            Recent Interview Requests
          </h2>
          <p className="text-gray-600 mb-4">
            Latest interview requests from users
          </p>
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Position</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{request.user}</td>
                  <td className="py-2 px-4">{request.position}</td>
                  <td className="py-2 px-4">{request.date}</td>
                  <td className="py-2 px-4">{request.status}</td>
                  <td className="py-2 px-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;