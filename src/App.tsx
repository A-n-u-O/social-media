import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/ErrorPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import { useState } from "react";

function App() {
  const [opened, setOpened] = useState(true)
  setOpened(opened)
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
