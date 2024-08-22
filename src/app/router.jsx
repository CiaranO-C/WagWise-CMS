import ErrorPage from "./routes/404.jsx";
import App from "./App.jsx";
import Login from "./routes/login.jsx";
import Home from "./routes/home.jsx";
import Protected from "./routes/Protected.jsx";

const userLoader = async () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const res = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res;
    }
  }
  return null; //No valid token, so no user
};

const routesConfig = [
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: <Protected />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
        ],
      },
    ],
  },
];

export default routesConfig;
