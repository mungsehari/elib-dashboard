import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import HomePage from "./pages/home";
import RegisterPage from "./pages/auth/register-page";
import DashboardLayout from "./layouts/dashboard-layout";
import BooksPages from "./pages/books-page";

const router = createBrowserRouter([
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
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;
