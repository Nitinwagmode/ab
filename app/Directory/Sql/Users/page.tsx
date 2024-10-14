'use client'

import { useUserMentor } from "../../../context/UserMentorContext"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

const DirectorySqlUsers = () => {
  const { users } = useUserMentor()
  const sqlUsers = users.filter(user => user.tech === "SQL")
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords(prev => ({ ...prev, [email]: !prev[email] }))
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = sqlUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(sqlUsers.length / usersPerPage)

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const backButtonStyle = `
  inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg
  hover:bg-blue-700 transition duration-300 ease-in-out
`;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <Link href="/home" passHref>
          <button className={backButtonStyle}>← Back to Home</button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">SQL Users</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Password</th>
                <th className="py-3 px-4 text-left">Mentor</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map(user => (
                <tr key={user.email} className="border-b border-gray-200 hover:bg-blue-50 transition duration-150">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 relative">
                    <span className="pr-10">
                      {showPasswords[user.email] ? user.password : '••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(user.email)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <FontAwesomeIcon
                        icon={showPasswords[user.email] ? faEye : faEyeSlash}
                        className="text-blue-600 hover:text-blue-800"
                      />
                    </button>
                  </td>
                  <td className="py-3 px-4">{user.mentor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                <span className="font-medium">{Math.min(indexOfLastUser, sqlUsers.length)}</span> of{' '}
                <span className="font-medium">{sqlUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectorySqlUsers