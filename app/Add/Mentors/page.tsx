"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  fetchMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../../api/mentor"; // Import API functions

const Mentor = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    tech: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [showViewPassword, setShowViewPassword] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchMentors();
      setUsers(fetchedUsers);
    };

    loadUsers();
  }, []);

  const validatePassword = (password) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";
    if (!/\d/.test(password))
      return "Password must contain at least one number.";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const saveEdit = async () => {
    if (!editingUser) return;

    const passwordError = validatePassword(editingUser.password);
    const emailError = validateEmail(editingUser.email);

    if (passwordError || emailError) {
      setPasswordError(passwordError);
      setEmailError(emailError);
      return;
    }

    setPasswordError("");
    setEmailError("");

    await updateMentor(editingUser._id, editingUser);
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u._id === editingUser._id ? { ...editingUser } : u))
    );
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    try {
        // Call the deleteMentor API function
        await deleteMentor(id);
        
        // Update local state to remove the deleted mentor
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id)); // Use _id if using MongoDB

    } catch (error) {
        console.error('Error deleting mentor:', error);
        // Optionally, you can show an error message to the user
        alert('Failed to delete mentor. Please try again.');
    }
};


  const handleView = (user) => {
    setViewingUser(user);
  };

  const handleAddUser = async () => {
    const passwordError = validatePassword(newUser.password);
    const emailError = validateEmail(newUser.email);

    if (passwordError || emailError) {
      setPasswordError(passwordError);
      setEmailError(emailError);
      return;
    }

    setPasswordError("");
    setEmailError("");

    const addedUser = await createMentor(newUser);
    setUsers((prevUsers) => [...prevUsers, addedUser]);
    setNewUser({ name: "", email: "", password: "", tech: "" }); // Reset new user state after adding
  };

  const backButtonStyle = `
    inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg
    hover:bg-blue-700 transition duration-300 ease-in-out
  `;

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link href="/home" passHref>
          <button className={backButtonStyle}>← Back to Home</button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-5">All Mentors</h1>

      <div className="flex justify-end mb-5">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
      </div>

      {isAdding && (
        <div className="mb-5 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Add New Mentor</h2>
          <div className="grid grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-2 border border-gray-300 rounded w-full pr-10"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="p-2 border border-gray-300 rounded w-full pr-10"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer text-blue-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-blue-500"
                />
              </span>
            </div>
            <input
              type="text"
              placeholder="Tech"
              value={newUser.tech}
              onChange={(e) => setNewUser({ ...newUser, tech: e.target.value })}
              className="p-2 border border-gray-300 rounded w-full pr-10"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded col-span-1"
              onClick={handleAddUser}
            >
              Add Mentor
            </button>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
      )}

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left">No</th>
            <th className="p-2 border border-gray-300 text-left">Tech</th>
            <th className="p-2 border border-gray-300 text-left">Name</th>
            <th className="p-2 border border-gray-300 text-left">Email</th>
            <th className="p-2 border border-gray-300 text-left">Password</th>
            <th className="p-2 border border-gray-300 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="p-2 border border-gray-300">{index + 1}</td>
              <td className="p-2 border border-gray-300">{user.tech}</td>
              <td className="p-2 border border-gray-300">{user.name}</td>
              <td className="p-2 border border-gray-300">{user.email}</td>
              <td className="p-2 border border-gray-300">
                {showViewPassword ? user.password : "••••••••"}
                <span
                  className="cursor-pointer text-blue-500 ml-2"
                  onClick={() => setShowViewPassword(!showViewPassword)}
                >
                  <FontAwesomeIcon icon={showViewPassword ? faEyeSlash : faEye} />
                </span>
              </td>
              <td className="p-2 border border-gray-300 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  onClick={() => handleView(user)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">Edit Mentor</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="p-2 border border-gray-300 rounded"
              />
              <div className="relative">
                <input
                  type={showEditPassword ? "text" : "password"}
                  placeholder="Password"
                  value={editingUser.password}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, password: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded w-full pr-10"
                />
                <span
                  className="absolute right-3 top-2 cursor-pointer text-blue-500"
                  onClick={() => setShowEditPassword(!showEditPassword)}
                >
                  <FontAwesomeIcon
                    icon={showEditPassword ? faEye : faEyeSlash}
                    className="text-blue-500"
                  />
                </span>
              </div>
              {passwordError && <p className="text-red-500">{passwordError}</p>}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded col-span-2"
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">User Details</h2>
            <p>
              <strong>Name:</strong> {viewingUser.name}
            </p>
            <p>
              <strong>Email:</strong> {viewingUser.email}
            </p>
            <p>
              <strong>Password:</strong> {viewingUser.password}
            </p>
            <p>
              <strong>Tech:</strong> {viewingUser.tech}
            </p>
            <button
              className="mt-4 bg-blue-500 text-white py-1 px-3 rounded"
              onClick={() => setViewingUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentor;
