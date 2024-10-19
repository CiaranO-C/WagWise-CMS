import ErrorPage from "../routes/Error.jsx";
import App from "../App.jsx";
import Login from "../routes/Login.jsx";
import Home from "../routes/Home.jsx";
import Protected from "../routes/Protected.jsx";
import Articles from "../routes/Articles.jsx";
import Tags from "../routes/Tags.jsx";
import NewArticle from "../routes/NewArticle.jsx";
import TagArticles from "../routes/TagArticles.jsx";
import EditArticle from "../routes/EditArticle.jsx";
import SearchResults from "../routes/SearchResults.jsx";
import Comments from "../routes/Comments.jsx";
import {
  articlesLoader,
  commentsLoader,
  dashboardLoader,
  taggedArticles,
  tagsLoader,
} from "./loaders.js";

const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
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
