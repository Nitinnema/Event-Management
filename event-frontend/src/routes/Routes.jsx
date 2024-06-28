// react-router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// importing routes
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserHome from "../pages/UserHome";
import CreateEvent from "../pages/CreateEvent";
import EventDetail from "../pages/EventDetail";
import MyEventList from "../pages/MyEventList";
import EditEvent from "../pages/EditEvent";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<UserHome />} />
      <Route path="create-event" element={<CreateEvent />} />
      <Route path="edit-event" element={<EditEvent />} />
      <Route path="my-events" element={<MyEventList />} />
      <Route path="events/:id" element={<EventDetail />} />
    </Route>
  )
);
