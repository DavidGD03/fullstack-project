import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Import our custom CSS
import './scss/style.scss'
import Layout from './components/Layout';
import CreateTask from './views/CreateTask';
import Tasks from './views/Tasks';
import Login from './views/Login';
import Register from './views/Register';
import UpdateTask from './views/UpdateTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "createTask/",
        element: <CreateTask></CreateTask>,
      },
      {
        path: "updateTask/:taskId",
        element: <UpdateTask></UpdateTask>,
      },
      {
        path: "tasks/",
        element: <Tasks></Tasks>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
