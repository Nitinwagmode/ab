"use client";

import { useState, useEffect } from "react";
import { getEvents } from '../api/events'; // Adjust the path as necessary

interface Event {
  _id: string;
  title: string;
  start: string;
  end: string;
  userId: string;
}

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => localStorage.getItem('authToken'); // Simplified token retrieval
  const getUserId = () => localStorage.getItem('user'); // Retrieve userId
  const storedToken = getToken();
  const storedUserId = getUserId(); // Retrieve userId
  
  

  useEffect(() => {
    const fetchEvents = async () => {
      if (!storedToken || !storedUserId) {
        console.error("No token or userId found.");
        return;
      }

      try {
        const fetchedEvents = await getEvents(storedToken, storedUserId); // Pass userId to the function
        setEvents(fetchedEvents);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    if (storedToken && storedUserId) {
      fetchEvents();
    } else {
      setError("No authentication token or userId found.");
      setLoading(false);
    }
  }, [storedToken, storedUserId]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Event List</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="list-disc pl-5">
          {events.map((event) => (
            <li key={event._id} className="mb-2">
              <h2 className="font-semibold">{event.title}</h2>
              <p>
                Start: {new Date(event.start).toLocaleString()} <br />
                End: {new Date(event.end).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
