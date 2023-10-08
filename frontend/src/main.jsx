import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Import our custom CSS
import './scss/style.scss'
import Layout from './components/Layout';
import Contact from './views/Task';
import Contacts from './views/Tasks';
import Login from './views/Login';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "task/:taskId",
        element: <Contact></Contact>,
      },
      {
        path: "tasks/",
        element: <Contacts></Contacts>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
