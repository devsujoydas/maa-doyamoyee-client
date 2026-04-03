import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          usersRes,
          blogsRes,
          noticesRes,
          eventsRes,
          donationsRes,
          messagesRes,
        ] = await Promise.all([
          fetch("/json/users.json").then((res) => res.json()),
          fetch("/json/blogs.json").then((res) => res.json()),
          fetch("http://localhost:5000/api/v1/notices").then((res) => res.json()),
          fetch("/json/events.json").then((res) => res.json()),
          fetch("/json/donation.json").then((res) => res.json()),
          fetch("/json/messages.json").then((res) => res.json()),
        ]);

        setUsers(usersRes);
        setBlogs(blogsRes);
        setNotices(noticesRes);
        setEvents(eventsRes);
        setDonations(donationsRes);
        setMessages(messagesRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const value = {
    users,
    setUsers,
    blogs,
    setBlogs,
    notices,
    setNotices,
    events,
    setEvents,
    donations,
    setDonations,
    messages,
    setMessages,
    loading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook for easy access
export const useData = () => {
  return useContext(DataContext);
};
