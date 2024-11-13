import { waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "../CustomRender";
import { Route } from "react-router-dom";
import NewArticle from "../../src/app/routes/NewArticle";
import Articles from "../../src/app/routes/Articles";
import EditArticle from "../../src/app/routes/EditArticle";
import { mockAdmin, mockArticles, mockTags } from "../mocks/mocks-data";
import { getToken } from "../../src/api/utils";
import { articlesLoader } from "../../src/app/router/loaders";
import { deleteArticle, fetchArticle } from "../../src/api/api-article";
import userEvent from "@testing-library/user-event";

let admin;
let tags;
let articles;

vi.mock("../../src/app/router/loaders", () => ({
  tagsLoader: vi.fn(),
  articlesLoader: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-article", () => ({
  fetchArticle: vi.fn(),
  deleteArticle: vi.fn(),
}));

beforeEach(() => {
  admin = mockAdmin();
  tags = mockTags(5);
  articles = {
    published: mockArticles(10, null, true),
    unpublished: [],
  };
  getToken.mockResolvedValue({ token: true, error: null });
  articlesLoader.mockResolvedValue(articles);
  fetchArticle.mockResolvedValue(articles.published[0]);
});

function renderEditorRoute(initialEntries = ["/admin/new_article"]) {
  render(
    <>
      <Route path="new_article" element={<NewArticle />} />
      <Route path="articles" element={<Articles />}>
        <Route path=":id" element={<EditArticle />} />
      </Route>
    </>,
    { initialEntries, userState: admin },
  );
}

describe("New article render tests", () => {
  test("Renders title input", async () => {
    renderEditorRoute();

    await waitFor(() => {
      expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    });
  });

  test("Renders new tag button", async () => {
    renderEditorRoute();

    await waitFor(() => {
      screen.debug(undefined, 30000);
      expect(
        screen.getByLabelText("open create tag modal"),
      ).toBeInTheDocument();
    });
  });

  test("Renders option list of available tags", async () => {
    renderEditorRoute();

    await waitFor(() => {
      expect(
        screen.getByRole("combobox", { value: "Choose tag" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders preview button", async () => {
    renderEditorRoute();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Preview" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders save button", async () => {
    renderEditorRoute();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });
  });
  test("Renders disabled delete button", async () => {
    renderEditorRoute();

    await waitFor(() => {
      const button = screen.getByRole("button", { name: "Delete article" });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });
});

describe("Edit article render tests", () => {
  let article;
  beforeEach(() => {
    article = articles.published[0];
  });
  test("Renders article title inside title input", async () => {
    renderEditorRoute([`/admin/articles/${article.id}`]);

    await waitFor(() => {
      expect(screen.getByRole("textbox", { value: article.title }))
        .toBeInTheDocument;
    });
  });

  test("Renders article body inside body input", async () => {
    renderEditorRoute([`/admin/articles/${article.id}`]);

    await waitFor(() => {
      expect(
        screen.getByRole("textbox", {
          value: article.body.replace(/<\/?p>/g, ""),
        }),
      ).toBeInTheDocument;
    });
  });

  test("Renders article tags as buttons", async () => {
    renderEditorRoute([`/admin/articles/${article.id}`]);
    const { tags: articleTags } = article;

    await waitFor(() => {
      articleTags.forEach((tag) => {
        expect(
          screen.getByRole("button", { name: tag.tagName }),
        ).toBeInTheDocument();
      });
    });
  });
});

describe("Editor user event tests", () => {
  let article;
  beforeEach(() => {
    article = articles.published[0];
  });

  test("User can open options list to select new tags", async () => {
    const user = userEvent.setup();
    renderEditorRoute([`/admin/articles/${article.id}`]);

    const select = await screen.findByRole("combobox", { value: "Choose tag" });
    await user.click(select);

    await waitFor(() => {
      tags.forEach((tag) => {
        expect(
          screen.getByRole("option", { value: tag.tagName }),
        ).toBeVisible();
      });
    });
  });

  test("User can view preview of article", async () => {
    const user = userEvent.setup();
    renderEditorRoute([`/admin/articles/${article.id}`]);

    const button = await screen.findByRole("button", { name: "Preview" });
    await user.click(button);

    expect(await screen.findByRole("heading", { name: article.title }));
  });

  test("Un-saved changes are shown in the preview screen", async () => {
    const user = userEvent.setup();
    renderEditorRoute([`/admin/articles/${article.id}`]);
    const titleInput = await screen.findByLabelText("Title:");
    await user.click(titleInput);
    await user.clear(titleInput);
    await user.keyboard("new title!");

    const button = await screen.findByRole("button", { name: "Preview" });
    await user.click(button);

    expect(await screen.findByRole("heading", { name: "new title!" }));
  });

  test("User can delete article", async () => {
    const user = userEvent.setup();
    renderEditorRoute([`/admin/articles/${article.id}`]);

    const deleteBtn = await screen.findByRole("button", {
      name: "Delete article",
    });
    await user.click(deleteBtn);

    expect(
      await screen.findByRole("heading", { name: "Delete Article?" }),
    ).toBeInTheDocument();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    await user.click(confirmButton);
    expect(deleteArticle).toHaveBeenCalled();
  });
});
