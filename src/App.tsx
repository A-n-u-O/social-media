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
import ChatBox from "./Components/ChatBox";

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
      children: [
        {
          path: "Home",
          element: <Home />,
        },
        {
          path: "Feed",
          element: <Feed />,
        },
        {
          path: "Messages",
          element: <Messages />,
          children: [
            {
              path: "ChatBox",
              element: <ChatBox />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
