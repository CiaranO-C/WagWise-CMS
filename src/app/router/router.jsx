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

const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
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
          {
            path: "articles",
            element: <Articles />,
            children: [
              {
                path: ":id",
                element: <EditArticle />,
              },
            ],
          },
          {
            path: "tags",
            element: <Tags />,
            children: [
              {
                path: ":tagName",
                element: <TagArticles />,
              },
            ],
          },
          {
            path: "new_article",
            element: <NewArticle />,
          },
          {
            path: "search",
            element: <SearchResults />,
          },
          {
            path: "comments",
            element: <Comments />,
          },
        ],
      },
    ],
  },
];

export default routesConfig;
