import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserHome = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        if (response.status === 200) {
          console.log(response.data[0]);
          setEvents(response.data[0]);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    };

    getEvents();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const showEventDetail = (id) => {
    navigate(`/events/${id}`);
  };

  const handleAttend = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/events/${id}/attend`
      );
      console.log(response, "ATTENED");
      // if (response.status === 200) {
      //   console.log(response);
      //   setEvent(response.data);
      // }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  if (!events) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-xl font-bold">List of Events</h3>
        <div>
          <Link
            to="/my-events"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-4 rounded"
          >
            My Events
          </Link>
          <Link
            to="/create-event"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => showEventDetail(event.id)}
              >
                <td className="py-4 px-6">{event.title}</td>
                <td className="py-4 px-6">{event.description}</td>
                <td className="py-4 px-6">{formatDate(event.date)}</td>
                <td className="py-4 px-6">{event.location}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={(e) => handleAttend(event.id, e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Attend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserHome;
