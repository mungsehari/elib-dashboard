import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import HomePage from "./pages/home";
import RegisterPage from "./pages/auth/register-page";
import DashboardLayout from "./layouts/dashboard-layout";
import BooksPages from "./pages/books-page";
import AuthLayout from "./layouts/auth-layout";
import CreateBook from "./pages/create-book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard/home"} />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "books",
        element: <BooksPages />,
      },
      {
        path: "books/create",
        element: <CreateBook />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
