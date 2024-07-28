import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/auth/login-page";
import HomePage from "./pages/home";
import RegisterPage from "./pages/auth/register-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
