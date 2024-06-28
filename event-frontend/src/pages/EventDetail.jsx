import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events/${id}`
        );
        if (response.status === 200) {
          console.log(response);
          setEvent(response.data);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    };

    getEventDetail();
  }, []);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 my-8">
      <h2 className="text-2xl font-bold mb-4">Event Details</h2>
      <p className="text-lg mb-4">
        <span className="font-bold">Title:</span> {event.title}
      </p>
      <p className="text-lg mb-4">
        <span className="font-bold">Description:</span> {event.description}
      </p>
      <p className="text-lg mb-4">
        <span className="font-bold">Date:</span>{" "}
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-lg mb-4">
        <span className="font-bold">Location:</span> {event.location}
      </p>
    </div>
  );
};

export default EventDetail;
