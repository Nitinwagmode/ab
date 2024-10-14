// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { signup } from '../api/api'; // Adjust this import to the correct path

// const SignIn = () => {
//   const [name, setname] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [technology, setTechnology] = useState(''); // Updated state name
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const signupData = {
//         name,
//         email,
//         password,
//         tech: technology, // assuming 'technology' is treated as 'role' here
//       };
//       const token = await signup(signupData);
//       setSuccess(true);
//       setError(null);
//       // Do something with the token, e.g., store it in localStorage or context
//       console.log('Signup successful. Token:', token);
//     } catch (err: any) {
//       setSuccess(false);
//       setError(err.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-500 to-teal-600 p-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-white font-serif">Sign Up</h1>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-center mb-4">Signup successful!</p>}
//         <form onSubmit={handleSignUp}>
//           <div className="mb-6">
//             <label className="block text-gray-900 text-sm font-medium">Username</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setname(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-900 text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-900 text-sm font-medium">Technologies</label> {/* Changed label */}
//             <select
//               value={technology} // Updated value reference
//               onChange={(e) => setTechnology(e.target.value)} // Updated setter function
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
//               required
//             >
//               <option value="" disabled>Select a technology</option>
//               <option value="SQL">SQL</option>
//               <option value="ReactJs">REACT.JS</option>
//             </select>
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-900 text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
//             Sign Up
//           </button>
//           <p className="mt-4 text-center text-sm text-yellow">
//             Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
