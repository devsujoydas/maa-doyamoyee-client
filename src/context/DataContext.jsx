/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; // api should be Axios instance
import axios from "axios";

export const DataContext = createContext();

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
          api.get("/users"),
          api.get("/posts"),
          api.get("/notices"),
          axios.get("/json/events.json"),
          axios.get("/json/donation.json"),
          axios.get("/json/messages.json"), 
        ]);
 
        setUsers(usersRes.data);
        setBlogs(blogsRes.data);
        setNotices(noticesRes.data);
        setEvents(eventsRes.data);
        setDonations(donationsRes.data);
        setMessages(messagesRes.data);
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
