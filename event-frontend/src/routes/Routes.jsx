import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserHome from "../pages/UserHome";
import CreateEvent from "../pages/CreateEvent";
import EditEvent from "../pages/EditEvent";
import MyEventList from "../pages/MyEventList";
import EventDetail from "../pages/EventDetail";
import PrivateRoute from "./PrivateRoute";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="home" element={<UserHome />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="edit-event" element={<EditEvent />} />
        <Route path="my-events" element={<MyEventList />} />
        <Route path="events/:id" element={<EventDetail />} />
      </Route>
    </Route>
  )
);
