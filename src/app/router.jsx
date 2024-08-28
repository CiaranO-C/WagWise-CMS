import ErrorPage from "./routes/404.jsx";
import App from "./App.jsx";
import Login from "./routes/login.jsx";
import Home from "./routes/Home.jsx";
import Protected from "./routes/Protected.jsx";
import Articles from "./routes/Articles.jsx";
import Tags from "./routes/Tags.jsx";
import NewArticle from "./routes/NewArticle.jsx";
import TagArticles from './routes/TagArticles.jsx';

async function userLoader() {
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
    const res = await fetch("/api/tags");
    if (res.ok) {
      return res;
    }
  }
  return null;
}

async function taggedArticles({ params }){
console.log(params);
return params
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
            loader: tagsLoader
          },
        ],
      },
    ],
  },
];

export default routesConfig;
