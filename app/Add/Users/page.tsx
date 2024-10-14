"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { useUserMentor } from "../../context/UserMentorContext";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchUserById,  // Import fetchUserById
} from '../../api/userapi'; // Adjust the path as needed

interface UserType {
  id?: string;
  name: string;
  email: string;
  password: string;
  tech: string;
  mentor: string;
}

const User = () => {
  const { addUser } = useUserMentor();
  const [form, setForm] = useState<UserType>({
    name: "",
    email: "",
    password: "",
    tech: "",
    mentor: "",
  });

  const [users, setUsers] = useState<UserType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewedUser, setViewedUser] = useState<UserType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    };
    loadUsers();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address.";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase.";
    if (!/[a-z]/.test(password)) return "Must contain at least one lowercase.";
    if (!/\d/.test(password)) return "Must contain at least one number.";
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    setErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    try {
      if (isEditing) {
        const updatedUser = await updateUser(currentUserId!, form);
        setUsers(users.map((user) => (user.id === currentUserId ? updatedUser : user)));
        setIsEditing(false);
        setCurrentUserId(null);
      } else {
        const newUser = await createUser(form);
        setUsers([...users, newUser]);
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
    } finally {
      resetForm();
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      tech: "",
      mentor: "",
    });
    setErrors({ email: "", password: "" });
  };

  const handleView = (user: UserType) => {
    setViewedUser(user);
    setIsModalOpen(true);
  };

  const handleEdit = async (userId: string) => {
    try {
      const user = await fetchUserById(userId); // Fetch user by ID
      setForm(user);
      setIsEditing(true);
      setCurrentUserId(userId);
    } catch (error) {
      console.error("Error fetching user for edit:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords({ ...showPasswords, [id]: !showPasswords[id] });
  };

  const paginatedUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

      <h1 className="text-2xl font-bold mb-5">
        {isEditing ? "Edit User" : ""}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="grid grid-cols-2 gap-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label className="font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded"
              placeholder="Full name"
              required
            />
          </div>
          {/* Email Field */}
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded"
              placeholder="Email"
              required
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          {/* Password Field */}
          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full pr-10"
                placeholder="Password"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-blue-500"
                />
              </span>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          {/* Tech Dropdown */}
          <div className="flex flex-col">
            <label className="font-semibold">Tech</label>
            <select
              name="tech"
              value={form.tech}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded"
              required
            >
              <option value="" disabled>
                Select Technology
              </option>
              <option value="React">React</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
          {/* Mentor Field */}
          <div className="flex flex-col">
            <label className="font-semibold">Mentor</label>
            <input
              type="text"
              name="mentor"
              value={form.mentor}
              onChange={handleInputChange}
              className="mt-2 p-2 border border-gray-300 rounded"
              placeholder="Mentor"
              required
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mt-10">User List</h2>
      <div className="bg-white p-4 rounded shadow-md mt-5">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 border">No</th>
                  <th className="py-2 border">Name</th>
                  <th className="py-2 border">Email</th>
                  <th className="py-2 border">Password</th>
                  <th className="py-2 border">Tech</th>
                  <th className="py-2 border">Mentor</th>
                  <th className="py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr key={user.id}>
                    <td className="py-2 border">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td className="py-2 border">{user.name}</td>
                    <td className="py-2 border">{user.email}</td>
                    <td className="py-2 border relative">
                      {showPasswords[user.id || ""] ? user.password : "●●●●●●●●"}
                      <span
                        className="absolute right-3 top-2 cursor-pointer"
                        onClick={() => togglePasswordVisibility(user.id || "")}
                      >
                        <FontAwesomeIcon
                          icon={showPasswords[user.id || ""] ? faEye : faEyeSlash}
                          className="text-blue-500"
                        />
                      </span>
                    </td>
                    <td className="py-2 border">{user.tech}</td>
                    <td className="py-2 border">{user.mentor}</td>
                    <td className="py-2 border">
                      <button
                        onClick={() => handleView(user)}
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mr-2"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(user._id || "")} // Ensure user.id is passed
                        className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id || "")} // Ensure user.id is passed
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="py-1 px-3 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= Math.ceil(users.length / itemsPerPage)}
                className="py-1 px-3 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {/* View Modal */}
      {isModalOpen && viewedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {viewedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {viewedUser.email}
            </p>
            <p>
              <strong>Password:</strong> {viewedUser.password}
            </p>
            <p>
              <strong>Tech:</strong> {viewedUser.tech}
            </p>
            <p>
              <strong>Mentor:</strong> {viewedUser.mentor}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
