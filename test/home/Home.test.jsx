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
import { dashboardLoader } from "../../src/app/router/loaders";
import { getToken } from "../../src/api/utils";
import { fetchComments } from "../../src/api/api-comment";

vi.mock("../../src/app/router/loaders", () => ({
  dashboardLoader: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-comment", () => ({
  fetchComments: vi.fn(),
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
});

function renderHome() {
  render(
    <Route path="/admin" element={<Protected />}>
      <Route path="home" element={<Home />} />
    </Route>,
    { initialEntries: ["/admin/home"], userState: admin },
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

      expect(screen.getByRole("heading", { name: "View All Comments"})).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Review Flagged"})).toBeInTheDocument();
    });
  });

  test("Renders user stats section", async () => {
    renderHome();

    await waitFor(() => {
        expect(screen.getByRole("heading", { name: "User Stats"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Users"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Likes"})).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Comments"})).toBeInTheDocument();
    });
  });
});
