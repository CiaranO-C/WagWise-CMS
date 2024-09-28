import ErrorPage from "./routes/Error.jsx";
import App from "./App.jsx";
import Login from "./routes/login.jsx";
import Home from "./routes/Home.jsx";
import Protected from "./routes/Protected.jsx";
import Articles from "./routes/Articles.jsx";
import Tags from "./routes/Tags.jsx";
import NewArticle from "./routes/NewArticle.jsx";
import TagArticles from "./routes/TagArticles.jsx";
import EditArticle from "./routes/EditArticle.jsx";
import SearchResults from "./routes/SearchResults.jsx";
import { getToken, refreshToken } from "../services/authService.js";
import Comments from "./routes/Comments.jsx";


async function getUser() {
  try {
    const token = getToken();
    if (token) {
      const res = await fetch("/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }
    return null;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

async function userLoader() {
  try {
    let res = await getUser();

    // unauthorized - invalid token
    if (!res || res.status === 401) {
      console.log("refresh needed");
      const refreshAccess = await refreshToken();

      if (refreshAccess) {
        res = await getUser();
      } else {
        return null;
      }
    } else {
      console.log("No refresh needed");
    }
    const user = await res.json();
    return user;
  } catch (error) {
    throw new Error(`Error refreshing token: ${error.message}`);
  }
}

async function dashboardLoader() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const articleParams = new URLSearchParams({
      sort: "created",
      limit: 3,
    });
    const res = await Promise.all([
      fetch(`/api/articles?${articleParams}`),
      fetch(`/api/articles/admin/unpublished?${articleParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch("/api/tags"),
    ]);
    const resJson = await Promise.all(res.map((r) => r.json()));

    return {
      articles: {
        published: resJson[0].articles,
        unpublished: resJson[1].articles,
      },
      tags: resJson[2].tags,
    };
  }
  return null;
}

async function articlesLoader() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const res = await Promise.all([
      fetch("/api/articles"),
      fetch("/api/articles/admin/unpublished", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);
    if (res[0].ok && res[1].ok) {
      const { articles: published } = await res[0].json();
      const { articles: unpublished } = await res[1].json();
      return { published, unpublished };
    }
  }
  return null;
}

async function tagsLoader() {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const res = await fetch("/api/tags/admin/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      return res;
    }
  }
  return null;
}

async function taggedArticles({ params }) {
  const token = localStorage.getItem("accessToken");
  const tagName = params.tagName.split("_").join(" ");
  const res = await fetch(`/api/tags/admin/${tagName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { tag } = await res.json();

  return tag.articles;
}

async function commentsLoader() {
  const token = localStorage.getItem("accessToken");
  const res = await fetch(`/api/user/admin/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Response("Resource could not be accessed", {
      status: res.status,
    });
  }

  return res.json();
}

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
            loader: dashboardLoader,
          },
          {
            path: "articles",
            element: <Articles />,
            loader: articlesLoader,
            children: [
              {
                path: ":id",
                element: <EditArticle />,
                loader: tagsLoader,
              },
            ],
          },
          {
            path: "tags",
            element: <Tags />,
            loader: tagsLoader,
            children: [
              {
                path: ":tagName",
                element: <TagArticles />,
                loader: taggedArticles,
              },
            ],
          },
          {
            path: "new_article",
            element: <NewArticle />,
            loader: tagsLoader,
          },
          {
            path: "search",
            element: <SearchResults />,
          },
          {
            path: "comments",
            element: <Comments />,
            loader: commentsLoader,
          },
        ],
      },
    ],
  },
];

export default routesConfig;
