import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "../CustomRender";
import { Route } from "react-router-dom";
import Home from "../../src/app/routes/Home";
import Protected from "../../src/app/routes/Protected";
import {
  mockAdmin,
  mockArticles,
  mockComments,
  mockTags,
} from "../mocks/mocks-data";
import {
  articlesLoader,
  commentsLoader,
  dashboardLoader,
  taggedArticles,
  tagsLoader,
} from "../../src/app/router/loaders";
import { getToken } from "../../src/api/utils";
import { fetchComments } from "../../src/api/api-comment";
import userEvent from "@testing-library/user-event";
import NewArticle from "../../src/app/routes/NewArticle";
import Tags from "../../src/app/routes/Tags";
import TagArticles from "../../src/app/routes/TagArticles";
import Articles from "../../src/app/routes/Articles";
import EditArticle from "../../src/app/routes/EditArticle";
import { fetchArticle } from "../../src/api/api-article";
import Comments from "../../src/app/routes/Comments";

vi.mock("../../src/app/router/loaders", () => ({
  dashboardLoader: vi.fn(),
  tagsLoader: vi.fn(),
  taggedArticles: vi.fn(),
  articlesLoader: vi.fn(),
  commentsLoader: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-comment", () => ({
  fetchComments: vi.fn(),
}));

vi.mock("../../src/api/api-article", () => ({
  fetchArticle: vi.fn(),
}));

vi.mock("../../src/api/api-tag", () => ({
  handleNewTag: vi.fn(),
}));

let admin;
let articles;
let tags;
let comments;

beforeEach(() => {
  admin = mockAdmin();
  articles = {
    published: mockArticles(10, null, true),
    unpublished: mockArticles(5, null, false),
  };
  tags = mockTags(5);
  comments = { recent: mockComments(20), review: mockComments(3) };

  dashboardLoader.mockResolvedValue({
    articles,
    tags,
  });
  getToken.mockResolvedValue({ token: true, error: null });
  fetchComments.mockResolvedValue(comments);
  commentsLoader.mockResolvedValue([...comments.recent, ...comments.review]);
  articlesLoader.mockResolvedValue(articles);
});

function renderHome(navigateTo = null, initialEntries = ["/admin/home"]) {
  render(
    <Route path="/admin" element={<Protected />}>
      <Route path="home" element={<Home />} />
      {navigateTo && navigateTo}
    </Route>,
    { initialEntries, userState: admin },
  );
}

describe("Home route render tests", () => {
  test("Renders sidebar with logo", async () => {
    renderHome();
    await waitFor(() => {
      expect(screen.getByAltText("wagwise logo")).toBeInTheDocument();
    });
  });

  test("Renders navlinks and logout btn in sidebar", async () => {
    renderHome();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Articles" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "New Article" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Comments" }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Logout")).toBeInTheDocument();
    });
  });

  test("Renders links to blog and github", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: "User Site" }),
      ).toBeInTheDocument();
      const gitLink = screen
        .getAllByRole("link")
        .find(
          (link) =>
            link.getAttribute("href") ===
            "https://github.com/CiaranO-C/wagwise-cms",
        );
      expect(gitLink).toBeVisible();
    });
  });

  test("Renders welcome message with admins username", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: `Welcome back, ${admin.username}`,
        }),
      );
    });
  });

  test("Renders New article and New tag buttons", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "New Article" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "New Tag" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders Most used tags section", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Most used tags" }),
      ).toBeInTheDocument();

      tags.forEach((tag) => {
        expect(
          screen.getByRole("link", { name: tag.tagName }),
        ).toBeInTheDocument();
      });
    });
  });

  test("Renders recent articles section with util buttons", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Recent Articles" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "All" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Published" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Unpublished" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "View Article" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Quick unpublish" }),
      ).toBeInTheDocument();
    });
  });

  test("Display most recent article title", async () => {
    renderHome();

    await waitFor(() => {
      const mostRecent = articles.published[0];
      expect(
        screen.getByRole("heading", { name: mostRecent.title }),
      ).toBeInTheDocument();
    });
  });

  test("Renders comments section", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Recent" }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("heading", { name: "Flagged" }),
      ).toBeInTheDocument();
      const comments = screen.getAllByText(/(comment)(?=\d+)/);
      comments.forEach((comment) => expect(comment).toBeInTheDocument());

      expect(
        screen.getByRole("heading", { name: "View All Comments" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Review Flagged" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders user stats section", async () => {
    renderHome();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "User Stats" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Users" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Likes" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Comments" }),
      ).toBeInTheDocument();
    });
  });
});

describe("Home route user event tests", () => {
  beforeEach(() => {
    tagsLoader.mockResolvedValue(tags);
  });

  test("Click on new article open new article page", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="new_article" element={<NewArticle />} />);

    const link = screen.getByRole("link", { name: "New Article" });
    await user.click(link);

    expect(await screen.findByText("New article")).toBeInTheDocument();
  });

  test("Click on new tag opens new tag modal", async () => {
    const user = userEvent.setup();
    renderHome();

    const link = await screen.findByLabelText("open create tag modal");
    await user.click(link);

    expect(
      await screen.findByRole("heading", { name: "Create New Tag" }),
    ).toBeInTheDocument();
  });

  test("Submit new tag shows success message", async () => {
    const user = userEvent.setup();
    renderHome();

    const link = await screen.findByLabelText("open create tag modal");
    await user.click(link);
    const submitBtn = await screen.findByRole("button", { name: "Create tag" });

    await user.keyboard("testTag");
    await user.click(submitBtn);

    expect(await screen.findByText("Tag Created!")).toBeInTheDocument();
  });

  test("Click on view all tags opens tags page", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="tags" element={<Tags />} />);

    const link = await screen.findByRole("link", { name: "View all" });
    await user.click(link);

    expect(
      await screen.findByRole("heading", { name: "All Tags" }),
    ).toBeInTheDocument();
  });

  test("Click on specific tag opens tag page with first two articles", async () => {
    const tagName = tags[0].tagName;
    const testArticles = mockArticles(3, tagName);
    taggedArticles.mockResolvedValue(testArticles);
    const user = userEvent.setup();
    renderHome(
      <Route path="tags" element={<Tags />}>
        <Route path=":tagName" element={<TagArticles />} />
      </Route>,
    );

    const tagLink = await screen.findByRole("link", { name: tagName });
    await user.click(tagLink);

    expect(
      await screen.findByRole("heading", { name: tagName }),
    ).toBeInTheDocument();

    for (let i = 0; i < testArticles.length - 1; i++) {
      const articleTitle = testArticles[i].title;
      expect(
        screen.getByRole("heading", { name: articleTitle }),
      ).toBeInTheDocument();
    }
  });

  test("Click on all articles opens articles page with 'All' selected", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="articles" element={<Articles />} />);

    const link = await screen.findByRole("link", { name: "All" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: "All Articles" }));
    expect(await screen.findByRole("link", { name: "All" })).toHaveClass(
      "active",
    );
  });

  test("Click on published articles opens articles page with 'Published' selected", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="articles" element={<Articles />} />);

    const link = await screen.findByRole("link", { name: "Published" });
    await user.click(link);

    expect(await screen.findByRole("heading", { name: "Published Articles" }));
    expect(await screen.findByRole("link", { name: "Published" })).toHaveClass(
      "active",
    );
  });

  test("Click on unpublished articles opens articles page with 'Unpublished' selected", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="articles" element={<Articles />} />);

    const link = await screen.findByRole("link", { name: "Unpublished" });
    await user.click(link);

    expect(
      await screen.findByRole("heading", { name: "Unpublished Articles" }),
    );
    expect(
      await screen.findByRole("link", { name: "Unpublished" }),
    ).toHaveClass("active");
  });

  test("Click on view article tag opens edit article page", async () => {
    const user = userEvent.setup();
    fetchArticle.mockResolvedValue(articles.published[0]);
    renderHome(
      <Route path="articles" element={<Articles />}>
        <Route path=":id" element={<EditArticle />} />
      </Route>,
    );
    const mostRecentTitle = articles.published[0].title;
    const link = await screen.findByRole("link", { name: "View Article" });
    await user.click(link);
    expect(
      await screen.findByRole("heading", { name: "Edit article" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { value: mostRecentTitle }),
    ).toBeInTheDocument();
  });

  test("Click on view all comments opens comments page, renders comments", async () => {
    const user = userEvent.setup();
    renderHome(<Route path="comments" element={<Comments />} />);

    const link = (
      await screen.findByRole("heading", { name: "View All Comments" })
    ).parentElement;

    await user.click(link);

    expect(
      await screen.findByRole("heading", { name: "Comments" }),
    ).toBeInTheDocument();

    const testAuthor = comments.recent[0].author.username;
    const testComment = comments.recent[0].text;
    expect(screen.getByText(testAuthor)).toBeInTheDocument();
    expect(screen.getByText(testComment)).toBeInTheDocument();
  });
});
