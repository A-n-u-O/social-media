import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ErrorPage from "./Pages/ErrorPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import { useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard";
import Feed from "./Components/Feed";
import Messages from "./Components/Messages";
import Home from "./Components/Home";

function App() {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    setOpened(true);

    return () => {
      setOpened(false);
    };
  }, []);
  console.log(opened);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage opened={opened} />,
      ErrorBoundary: ErrorPage,
    },
    {
      path: "signUpPage",
      element: <SignUpPage />,
    },
    {
      path: "logInPage",
      element: <LogInPage />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "feed",
          element: <Feed />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
