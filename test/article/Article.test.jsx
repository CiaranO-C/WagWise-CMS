import { beforeEach, describe, expect, test, vi } from "vitest";
import { articlesLoader, tagsLoader } from "../../src/app/router/loaders";
import { getToken } from "../../src/api/utils";
import { fetchArticle } from "../../src/api/api-article";
import { Route } from "react-router-dom";
import Articles from "../../src/app/routes/Articles";
import { render, screen, waitFor } from "../CustomRender";
import { mockAdmin, mockArticles, mockTags } from "../mocks/mocks-data";
import userEvent from "@testing-library/user-event";
import EditArticle from "../../src/app/routes/EditArticle";

vi.mock("../../src/app/router/loaders", () => ({
  articlesLoader: vi.fn(),
  tagsLoader: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-article", () => ({
  fetchArticle: vi.fn(),
}));

let admin;
let articles;

beforeEach(() => {
  admin = mockAdmin();
  articles = {
    published: mockArticles(10, null, true),
    unpublished: mockArticles(5, null, false),
  };

  getToken.mockResolvedValue({ token: true, error: null });
  articlesLoader.mockResolvedValue(articles);
});

function renderArticlePage(
  navigateTo = null,
  initialEntries = ["/admin/articles"],
) {
  render(
    <>
      <Route path="articles" element={<Articles />}>
        {navigateTo && navigateTo}
      </Route>
    </>,
    { initialEntries, userState: admin },
  );
}

describe("Article route render tests", () => {
  test("Renders title", async () => {
    renderArticlePage();

    expect(
      await screen.findByRole("heading", { name: "All Articles" }),
    ).toBeInTheDocument();
  });

  test("Renders filter buttons", async () => {
    renderArticlePage();

    expect(
      await screen.findByRole("link", { name: "All" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Published" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("link", { name: "Unpublished" }),
    ).toBeInTheDocument();
  });

  test("Renders searchbar", async () => {
    renderArticlePage();

    expect(
      await screen.findByRole("textbox", { value: "article..." }),
    ).toBeInTheDocument();
  });

  test("Renders 4 articles at a time", async () => {
    renderArticlePage();
    await waitFor(() => {
      for (let i = 0; i < 4; i++) {
        const articleTitle = articles.published[i].title;
        expect(screen.getByText(articleTitle)).toBeInTheDocument();
      }
      expect(screen.getAllByText(/Written by: /)).toHaveLength(4);
    });
  });
});

describe("Article route user event tests", () => {
  test("Selecting unpublished filter should update title and articles", async () => {
    const user = userEvent.setup();
    renderArticlePage();

    const unpubBtn = await screen.findByRole("link", { name: "Unpublished" });
    await user.click(unpubBtn);

    expect(
      await screen.findByRole("heading", { name: "Unpublished Articles" }),
    ).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      const articleTitle = articles.unpublished[i].title;
      const otherTitle = articles.published[i].title;
      expect(screen.getByText(articleTitle)).toBeInTheDocument();
      expect(screen.queryByText(otherTitle)).not.toBeInTheDocument();
    }
  });

  test("Selecting published filter should update title and articles", async () => {
    const user = userEvent.setup();
    renderArticlePage(null, ["/admin/articles?filter=unpublished"]);

    const pubBtn = await screen.findByRole("link", { name: "Published" });
    await user.click(pubBtn);

    expect(
      await screen.findByRole("heading", { name: "Published Articles" }),
    ).toBeInTheDocument();

    for (let i = 0; i < 4; i++) {
      const articleTitle = articles.published[i].title;
      const otherTitle = articles.unpublished[i].title;
      expect(screen.getByText(articleTitle)).toBeInTheDocument();
      expect(screen.queryByText(otherTitle)).not.toBeInTheDocument();
    }
  });

  test("Clicking article card opens edit article page", async () => {
    const article = articles.published[0];
    fetchArticle.mockResolvedValue(article);
    tagsLoader.mockResolvedValue(mockTags(5));
    const user = userEvent.setup();
    renderArticlePage(<Route path=":id" element={<EditArticle />} />);

    const articleCard = await screen.findByRole("heading", {
      name: article.title,
    });

    await user.click(articleCard);

    expect(await screen.findByRole("heading", { name: "Edit article" })).toBeInTheDocument();
    expect(await screen.findByRole("textbox", { value: article.title })).toBeInTheDocument();
  });
});
