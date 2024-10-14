'use client';

import { useState } from 'react';
import Sidebar from '../Sidebar';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: { [key: string]: string } = {};

    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.message) errors.message = "Message is required";

    if (Object.keys(errors).length === 0) {
      // Process form (e.g., send to API)
      console.log('Form submitted', formData);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div>
        <Sidebar />
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-teal-600 to-teal-500">
      <form className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg w-full max-w-md text-center" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-gray-800 mb-2">Send us a Message</h2>
        <p className="text-sm text-gray-600 mb-4">We're here to assist you</p>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
          ></textarea>
          {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
        </div>
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 w-full">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactForm;
