"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { div } from "framer-motion/client";
import { useRouter } from "next/navigation";

const page: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Add state for user
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Redirect to login if token or user data is missing
      router.push("/login");
    } else {
      setUser(JSON.parse(userData)); // Set the user if available
    }
  }, [router]);

  return (

    <div>
        <Sidebar />

    <div className="w-full h-full ml-5">
      {/* Welcome Section */}
      <div className="welcome-container h-[100vh] rounded-tr-lg overflow-hidden flex items-center">
        <div
          className="w-full h-full bg-cover"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1503945438517-f65904a52ce6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D')`,
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center text-white p-8 bg-black bg-opacity-40 h-full">
            <h1 className="text-5xl font-bold text-center">
              Welcome to The Interview Scheduler
            </h1>
            <p className="mt-8 text-2xl font-semibold text-center">
              Manage your interview schedules efficiently!
            </p>
            <div className="text-center mt-10">
              <h2 className="font-bold text-2xl">Quick Start</h2>
              <ul className="flex flex-col items-start list-disc mt-6 space-y-3">
                <li className="flex items-center">
                  <VscDebugBreakpointLogUnverified className="mr-2 text-xl" />
                  View and manage interview schedules
                </li>
                <li className="flex items-center">
                  <VscDebugBreakpointLogUnverified className="mr-2 text-xl" />
                  Add new interview slots
                </li>
                <li className="flex items-center">
                  <VscDebugBreakpointLogUnverified className="mr-2 text-xl" />
                  Track applicants and their status
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Topics Section */}
      <div className="topics-container bg-blue-50 w-full h-[70vh] text-gray-800 p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center font-bold mb-6">Explore Topics</h1>
        <div className="flex justify-center gap-12">
          {/* React Section */}
          <motion.div
            className="flex flex-col items-center w-[22vw] bg-white shadow-lg rounded-lg p-6"
            initial={{ scale: 1, translateY: 0 }} // Initial scale and position
            whileHover={{ scale: 1.1, translateY: -10 }} // Pop-up effect on hover
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-semibold text-xl mb-4 text-center text-gray-800">
              React
            </h4>
            <p className="text-justify text-gray-600">
              React is a JavaScript library for building user interfaces. It
              allows developers to create large web applications that can update
              and render efficiently in response to data changes.
            </p>
          </motion.div>

          {/* SQL Section */}
          <motion.div
            className="flex flex-col items-center w-[22vw] bg-white shadow-lg rounded-lg p-6"
            initial={{ scale: 1, translateY: 0 }} // Initial scale and position
            whileHover={{ scale: 1.1, translateY: -10 }} // Pop-up effect on hover
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-semibold text-xl mb-4 text-center text-gray-800">
              SQL
            </h4>
            <p className="text-justify text-gray-600">
              SQL (Structured Query Language) is used to communicate with
              databases. It is the standard language for relational database
              management systems to perform tasks such as query, update, and
              management of data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer w-full flex justify-center gap-40 bg-gray-900 p-12 rounded-br-lg text-white">
        <div className="flex items-center w-[20vw]">
          <img
            src="/ignited_logo.jpeg" // Ensure the path is correct
            alt="Ignited Logo"
            className="h-16 mr-4" // Adjust the height as needed (e.g., h-16 for 4rem)
          />
          <h4 className="text-2xl font-semibold">Ignited Minds Technologies</h4>
        </div>
        <div className="w-[20vw] flex flex-col font-semibold">
          {["About", "Terms Of Service", "Privacy"].map((item, index) => {
            return (
              <h4 className="mb-3" key={index}>
                {item}
              </h4>
            );
          })}
          <Link href="/ContactForm">
            <h4 className="mb-3 cursor-pointer hover:underline">Contact Us</h4>
          </Link>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default page;


