import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockAdmin, mockArticles, mockTags } from "../mocks/mocks-data";
import { getToken } from "../../src/api/utils";
import { taggedArticles, tagsLoader } from "../../src/app/router/loaders";
import { render, screen, waitFor, within } from "../CustomRender";
import { Route } from "react-router-dom";
import Tags from "../../src/app/routes/Tags";
import TagArticles from "../../src/app/routes/TagArticles";
import userEvent from "@testing-library/user-event";
import { handleNewTag } from "../../src/api/api-tag";

vi.mock("../../src/app/router/loaders", () => ({
  tagsLoader: vi.fn(),
  taggedArticles: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-tag", () => ({
  handleNewTag: vi.fn(),
}));

let admin;
let tags;

beforeEach(() => {
  admin = mockAdmin();
  tags = mockTags(5);

  getToken.mockResolvedValue({ token: true, error: null });
  tagsLoader.mockResolvedValue(tags);
});

function renderTagsPage(initialEntries = ["/admin/tags"]) {
  render(
    <Route path="tags" element={<Tags />}>
      <Route path=":tagName" element={<TagArticles />} />
    </Route>,
    { initialEntries, userState: admin },
  );
}

describe("Tag route render tests", () => {
  test("Renders title", async () => {
    renderTagsPage();

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "All Tags" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders new tag button", async () => {
    renderTagsPage();

    await waitFor(() => {
      expect(
        screen.getByLabelText("open create tag modal"),
      ).toBeInTheDocument();
    });
  });

  test("Renders list of tags with their article counts", async () => {
    renderTagsPage();

    await waitFor(() => {
      tags.forEach((tag) => {
        const title = screen.getByRole("heading", { name: tag.tagName });
        const card = title.parentElement;
        expect(title).toBeInTheDocument();
        expect(
          within(card).getByText(`No. articles ${tag._count.articles}`),
        ).toBeInTheDocument();
      });
    });
  });
});

describe("Tag route user event tests", () => {
  test("User can create new tag", async () => {
    const user = userEvent.setup();
    renderTagsPage();

    const button = await screen.findByLabelText("open create tag modal");
    await user.click(button);

    const submitBtn = await screen.findByRole("button", { name: "Create tag" });

    await user.keyboard("testTag");
    await user.click(submitBtn);

    expect(await screen.findByText("Tag Created!")).toBeInTheDocument();
    expect(handleNewTag).toHaveBeenCalled();
  });
  taggedArticles;
  test("User can visit individual tag page", async () => {
    const user = userEvent.setup();
    const tagName = tags[0].tagName;
    const testArticles = mockArticles(3, tagName);
    taggedArticles.mockResolvedValue(testArticles);
    renderTagsPage([`/admin/tags/${tagName}`]);

    const tagCard = await screen.findByRole("heading", {
      name: tagName,
    });

    await user.click(tagCard);

    expect(
      await screen.findByRole("heading", { name: tagName, level: 1 }),
    ).toBeInTheDocument();

    for (let i = 0; i < 2; i++) {
      const articleTitle = testArticles[i].title;
      expect(
        screen.getByRole("heading", { name: articleTitle }),
      ).toBeInTheDocument();
    }
  });
});
