"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  fetchCoAdmins,
  createCoAdmin,
  updateCoAdmin,
  deleteCoAdmin,
} from '../../api/coAdmin'; // Adjust the import based on your file structure

const CoAdmin = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [viewUser, setViewUser] = useState(null);

  // Fetch all co-admins on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchCoAdmins();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching co-admins:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (index) => {
    setShowPassword((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleAddOrEditUser = async () => {
    if (form.email === "") {
      setEmailError("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }

    if (form.password === "") {
      setPasswordError("Password is required");
    } else if (form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }

    if (emailError === "" && passwordError === "") {
      try {
        if (isEditing && currentUserId) {
          await updateCoAdmin(currentUserId, form);
          setUsers(users.map((user) => (user.id === currentUserId ? { ...form, id: currentUserId } : user)));
          setIsEditing(false);
          setCurrentUserId(null);
        } else {
          const newUser = await createCoAdmin(form);
          setUsers([...users, { ...newUser }]);
        }
        setForm({ name: "", email: "", password: "" });
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteCoAdmin(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link href="/home" passHref>
          <button className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
            ← Back to Home
          </button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-5">Co-Admin Dashboard</h1>

      <div className="mb-5 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">
          {isEditing ? "Edit Co-Admin" : "Add New Co-Admin"}
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
          />
          <div className="relative">
            <input
              type={showPassword[0] ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="p-2 border border-gray-300 rounded w-full"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(0)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500"
            >
              <FontAwesomeIcon icon={showPassword[0] ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        {emailError && <p className="text-red-500">{emailError}</p>}
        {passwordError && <p className="text-red-500">{passwordError}</p>}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleAddOrEditUser}
          >
            {isEditing ? "Save Changes" : "Submit"}
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentUserId(user._id);
                    setForm(user);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded ml-2"
                  onClick={() => setViewUser(user)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-lg font-bold mb-3">CoAdmin Details</h3>
            <p><strong>Name:</strong> {viewUser.name}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Password:</strong> {viewUser.password}</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setViewUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoAdmin;
