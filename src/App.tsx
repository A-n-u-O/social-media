import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/ErrorPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import { useState } from "react";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [opened, setOpened] = useState(true);
  setOpened;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage opened={opened} />,
      ErrorBoundary: ErrorPage,
    },
    {
      path: "SignUpPage",
      element: <SignUpPage />,
    },
    {
      path: "LogInPage",
      element: <LogInPage />,
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
