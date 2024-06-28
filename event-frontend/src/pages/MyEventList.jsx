import { useEffect, useState } from "react";
import axios from "axios";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const MyEventList = () => {
  const id = JSON.parse(localStorage.getItem("userData")).id;
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const showEventDetail = (id) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/my-events/${id}`
        );
        if (response.status === 200) {
          console.log(response.data);
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    };

    getEventDetail();
  }, []);

  const editEvent = (event, e) => {
    e.stopPropagation();
    navigate("/edit-event", { state: { event } });
  };

  const deleteEvent = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/events/${id}`
      );
      if (response.status === 204) {
        // Remove the deleted event from state
        setEvents(events.filter((event) => event.id !== id));
        console.log("Event deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-xl font-bold">Your Events</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => showEventDetail(event.id)}
              >
                <td className="py-2 px-4">{event.title}</td>
                <td className="py-2 px-4">{event.description}</td>
                <td className="py-2 px-4">{formatDate(event.date)}</td>
                <td className="py-2 px-4">{event.location}</td>
                <td className="py-2 px-4 flex">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="h-6 w-6 text-blue-600 cursor-pointer mr-4"
                    onClick={(e) => editEvent(event, e)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="h-6 w-6 text-red-600 cursor-pointer"
                    onClick={(e) => deleteEvent(event.id, e)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyEventList;
