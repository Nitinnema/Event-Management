import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditEvent = () => {
  const { state } = useLocation();
  const { event } = state;
  const [newEvent, setNewEvent] = useState(event);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (event.date) {
      const formattedDate = event.date.split(" ")[0]; // Extract YYYY-MM-DD
      setNewEvent({ ...event, date: formattedDate });
      console.log(newEvent);
    }
  }, []);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {
      title: "",
      description: "",
      date: "",
      location: "",
    };

    if (!newEvent.title) {
      newErrors.title = "Title is required";
      formValid = false;
    }
    if (!newEvent.description) {
      newErrors.description = "Description is required";
      formValid = false;
    }
    if (!newEvent.date) {
      newErrors.date = "Date is required";
      formValid = false;
    }
    if (!newEvent.location) {
      newErrors.location = "Location is required";
      formValid = false;
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    // Get organizer_id from localStorage (assuming it's stored after login)
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Add organizer_id to newEvent
    const eventData = {
      ...newEvent,
      organizer_id: userData.id,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/events/${newEvent.id}`,
        eventData
      );
      if (response.status === 200) {
        alert(response.data.message);
      }
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error creating event:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Update Event</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newEvent.title}
            onChange={handleChange}
            required
            className={`mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md px-3 py-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            required
            rows="3"
            className={`mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md px-3 py-2 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
            className={`mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md px-3 py-2 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={newEvent.location}
            onChange={handleChange}
            required
            className={`mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md px-3 py-2 ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
