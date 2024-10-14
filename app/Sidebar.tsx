// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { HomeIcon, UsersIcon, CalendarIcon, ChartBarIcon } from "@heroicons/react/outline"; // Add ChartBarIcon for Dashboard

// const Sidebar: React.FC = () => {
//   const [user, setUser] = useState<{ username: string; email: string; profilePhoto: string | null }>({
//     username: '',
//     email: '',
//     profilePhoto: null, // To hold the selected profile photo
//   });
//   const router = useRouter(); // Initialize router for redirection

//   // Retrieve user data and profile photo from localStorage when component mounts
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedProfilePhoto = localStorage.getItem("profilePhoto"); // To store profile photo separately
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser({
//         ...parsedUser,
//         profilePhoto: storedProfilePhoto || null, // Set the stored profile photo
//       });
//     }
//   }, []);

//   // Logout handler to clear localStorage and redirect to login
//   const handleLogout = () => {
//     localStorage.removeItem("authToken"); // Remove token
//     localStorage.removeItem("user"); // Remove user data
//     localStorage.removeItem("profilePhoto"); // Remove profile photo
//     router.push("/login"); // Redirect to login page
//   };

//   // Handle profile photo selection
//   const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         const photoUrl = reader.result as string;
//         setUser((prevUser) => ({ ...prevUser, profilePhoto: photoUrl }));
//         localStorage.setItem("profilePhoto", photoUrl); // Store the profile photo in localStorage
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="w-64 bg-gradient-to-b from-gray-700 to-gray-900 text-white h-screen p-6 flex flex-col shadow-lg fixed justify-between">
//       {/* Top Section: App Title */}
//       <div>
//         <div className="flex flex-col items-center mb-10">
//           <img
//             src="/ignited_logo.jpeg" // Ensure the correct path to your logo
//             alt="Ignited Minds Technologies"
//             className="h-16 mb-2" // Adjust the height as needed (e.g., h-16 for 4rem)
//           />
//           <h2 className="text-3xl font-semibold text-center text-white-400 mb-8">
//             Interview Scheduler
//           </h2>
//         </div>

//         {/* Navigation Links */}
//         <ul className="flex flex-col space-y-4">
//           {[
//             {
//               href: "/home",
//               label: "Home",
//               icon: <HomeIcon className="h-6 w-6 text-teal-300" />,
//             },
//             {
//               href: "/users",
//               label: "Users",
//               icon: <UsersIcon className="h-6 w-6 text-teal-300" />,
//             },
//             {
//               href: "/Calendar",
//               label: "Calendar",
//               icon: <CalendarIcon className="h-6 w-6 text-teal-300" />,
//             },
//             {
//               href: "/dashboard", // Dashboard link
//               label: "Dashboard",
//               icon: <ChartBarIcon className="h-6 w-6 text-teal-300" />, // Using ChartBarIcon for Dashboard
//             },
//             {
//               href: "/contactForm",
//               label: "Contact Us",
//               icon: (
//                 <svg
//                   className="h-6 w-6 text-teal-300"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 8a3 3 0 01-3 3H6a3 3 0 01-3-3V7h18v1zM5 12h14v6a3 3 0 01-3 3H8a3 3 0 01-3-3v-6z"
//                   />
//                 </svg>
//               ),
//             },
//           ].map(({ href, label, icon }) => (
//             <li key={label}>
//               <Link
//                 href={href}
//                 className="flex items-center space-x-3 py-2 px-4 rounded transition-colors hover:bg-gray-800"
//               >
//                 {icon}
//                 <span className="font-medium">{label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Section: User Info and Logout */}
//       {user && (
//         <div className="mt-auto text-center">
//           {/* Display Username and Email */}
//           <p className="text-lg font-bold">{user?.username}</p>
//           <p className="text-sm text-gray-400">{user?.email}</p>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full py-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HomeIcon,
  PlusIcon,
  UsersIcon,
  ChevronDownIcon,
  CalendarIcon,
} from "@heroicons/react/outline";

const Sidebar: React.FC = () => {
  const [user, setUser] = useState<{ username: string; email: string; profilePhoto: string | null }>({
    username: '',
    email: '',
    profilePhoto: null,
  });
  const [isAddDropdownOpen, setAddDropdownOpen] = useState(false);
  const [isDirectoryDropdownOpen, setDirectoryDropdownOpen] = useState(false);
  const [isReactDropdownOpen, setReactDropdownOpen] = useState(false);
  const [isSqlDropdownOpen, setSqlDropdownOpen] = useState(false);

  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePhoto");
    router.push("/login");
  };

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setAddDropdownOpen(false);
    setDirectoryDropdownOpen(false);
    setReactDropdownOpen(false);
    setSqlDropdownOpen(false);
  };

  // Toggle dropdown and close others
  const toggleAddDropdown = () => {
    closeAllDropdowns();
    setAddDropdownOpen(!isAddDropdownOpen);
  };

  const toggleDirectoryDropdown = () => {
    closeAllDropdowns();
    setDirectoryDropdownOpen(!isDirectoryDropdownOpen);
  };

  const toggleReactDropdown = () => {
    setReactDropdownOpen(!isReactDropdownOpen);
    setSqlDropdownOpen(false); // Close SQL dropdown if React is open
  };

  const toggleSqlDropdown = () => {
    setSqlDropdownOpen(!isSqlDropdownOpen);
    setReactDropdownOpen(false); // Close React dropdown if SQL is open
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-700 to-gray-900 text-white h-screen p-6 flex flex-col shadow-lg fixed justify-between">
      <div>
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-10">
          <img
            src="/ignited_logo.jpeg"
            alt="Ignited Minds Technologies"
            className="h-16 mb-2"
          />
          <h2 className="text-3xl font-semibold text-center text-white-400 mb-8">
            Interview Scheduler
          </h2>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-4">
          {/* Home Link */}
          <li>
            <Link href="/home" className="flex items-center space-x-3 py-2 px-4 rounded transition-colors hover:bg-gray-800">
              <HomeIcon className="h-6 w-6 text-teal-300" />
              <span className="font-medium">Home</span>
            </Link>
          </li>

          {/* Add Dropdown */}
          <li>
            <div
              onClick={toggleAddDropdown}
              className="flex items-center justify-between space-x-3 py-2 px-4 rounded cursor-pointer transition-colors hover:bg-gray-800"
            >
              <div className="flex items-center space-x-3">
                <PlusIcon className="h-6 w-6 text-teal-300" />
                <span className="font-medium">Add</span>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-teal-300" />
            </div>
            {isAddDropdownOpen && (
              <ul className="mt-2 space-y-1 pl-8">
                <li>
                  <Link href="/Add/Users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                </li>
                <li>
                  <Link href="/Add/Mentors" className="block py-2 px-4 hover:bg-gray-700">Mentors</Link>
                </li>
                <li>
                  <Link href="/Add/CoAdmin" className="block py-2 px-4 hover:bg-gray-700">Co-Admin</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Directory Dropdown */}
          <li>
            <div
              onClick={toggleDirectoryDropdown}
              className="flex items-center justify-between space-x-3 py-2 px-4 rounded cursor-pointer transition-colors hover:bg-gray-800"
            >
              <div className="flex items-center space-x-3">
                <UsersIcon className="h-6 w-6 text-teal-300" />
                <span className="font-medium">Directory</span>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-teal-300" />
            </div>
            {isDirectoryDropdownOpen && (
              <ul className="mt-2 space-y-1 pl-8">
                <li>
                  {/* React Dropdown */}
                  <div
                    onClick={toggleReactDropdown}
                    className="flex items-center justify-between py-2 px-4 hover:bg-gray-700 cursor-pointer"
                  >
                    <span>React</span>
                    <ChevronDownIcon className="h-5 w-5 text-teal-300" />
                  </div>
                  {isReactDropdownOpen && (
                    <ul className="pl-4 mt-1 space-y-1">
                      <li>
                        <Link href="/Directory/React/Users" className="block py-2 px-4 hover:bg-gray-600">Users</Link>
                      </li>
                      <li>
                        <Link href="/Directory/React/Mentors" className="block py-2 px-4 hover:bg-gray-600">Mentors</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  {/* SQL Dropdown */}
                  <div
                    onClick={toggleSqlDropdown}
                    className="flex items-center justify-between py-2 px-4 hover:bg-gray-700 cursor-pointer"
                  >
                    <span>SQL</span>
                    <ChevronDownIcon className="h-5 w-5 text-teal-300" />
                  </div>
                  {isSqlDropdownOpen && (
                    <ul className="pl-4 mt-1 space-y-1">
                      <li>
                        <Link href="/Directory/Sql/Users" className="block py-2 px-4 hover:bg-gray-600">Users</Link>
                      </li>
                      <li>
                        <Link href="/Directory/Sql/Mentors" className="block py-2 px-4 hover:bg-gray-600">Mentors</Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
          {/* Calendar Link */}
          <li>
            <Link
              href="/Calendar"
              className="flex items-center space-x-3 py-2 px-4 rounded transition-colors hover:bg-gray-800"
            >
              <CalendarIcon className="h-6 w-6 text-teal-300" />
              <span className="font-medium">Calendar</span>
            </Link>
          </li>
          <li>
            <Link
              href="/EventList"
              className="flex items-center space-x-3 py-2 px-4 rounded transition-colors hover:bg-gray-800"
            >
              <CalendarIcon className="h-6 w-6 text-teal-300" />
              <span className="font-medium">EventList</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Section: User Info and Logout */}
      {user && (
        <div className="mt-auto text-center">
          <p className="text-lg font-bold">{user?.username}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-4 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
