import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "../CustomRender";
import { Route } from "react-router-dom";
import Comments from "../../src/app/routes/Comments";
import { mockAdmin, mockComments } from "../mocks/mocks-data";
import { getToken } from "../../src/api/utils";
import { commentsLoader } from "../../src/app/router/loaders";
import userEvent from "@testing-library/user-event";
import { deleteComment } from "../../src/api/api-comment";

let admin;
let comments;

vi.mock("../../src/app/router/loaders", () => ({
  commentsLoader: vi.fn(),
}));

vi.mock("../../src/api/utils", () => ({
  getToken: vi.fn(),
}));

vi.mock("../../src/api/api-comment", () => ({
  deleteComment: vi.fn(),
}));

beforeEach(() => {
  admin = mockAdmin();
  const testComments = mockComments(6);
  const flagged = testComments.pop();
  flagged.review = true;

  comments = {
    recent: testComments,
    review: [flagged],
  };
  getToken.mockResolvedValue({ token: true, error: null });
  commentsLoader.mockResolvedValue([...comments.recent, ...comments.review]);
});

function renderCommentPage() {
  render(<Route path="comments" element={<Comments />} />, {
    userState: admin,
    initialEntries: ["/admin/comments"],
  });
}

describe("Comment route render tests", () => {
  test("Renders page title", async () => {
    renderCommentPage();

    expect(
      await screen.findByRole("heading", { name: "Comments" }),
    ).toBeInTheDocument();
  });

  test("Renders filter and delete buttons", async () => {
    renderCommentPage();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Flagged Only" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Flagged Only" }),
      ).toBeInTheDocument();
    });
  });

  test("Renders comment cards", async () => {
    renderCommentPage();

    await waitFor(() => {
      comments.recent.forEach((comment) => {
        expect(screen.getByText(comment.text)).toBeInTheDocument();
      });
      comments.review.forEach((comment) => {
        expect(screen.getByText(comment.text)).toBeInTheDocument();
      });
    });
  });
});

describe("Comment route user event tests", () => {
  test("Click flagged only filters", async () => {
    const user = userEvent.setup();
    renderCommentPage();

    const button = await screen.findByRole("button", { name: "Flagged Only" });
    await user.click(button);
    await waitFor(() => {
      const flaggedComment = comments.review[0].text;
      const comment = comments.recent[0].text;
      expect(screen.getByText(flaggedComment)).toBeInTheDocument();
      expect(screen.queryByText(comment)).not.toBeInTheDocument();
    });
  });

  test("Error message if flagged only clicked with no flagged comments", async () => {
    commentsLoader.mockResolvedValue(comments.recent);
    const user = userEvent.setup();
    renderCommentPage();

    const button = await screen.findByRole("button", { name: "Flagged Only" });
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText("No flagged comments found")).toBeInTheDocument();
    });
  });

  test("Click delete button calls delete comment function", async () => {
    commentsLoader.mockResolvedValue([comments.review[0]]);
    const user = userEvent.setup();
    renderCommentPage();

    const deleteBtn = await screen.findByRole("button", {
      name: "Delete",
    });
    await user.click(deleteBtn);

    const confirmBtn = await screen.findByTestId("confirm-delete");
    await user.click(confirmBtn);

    await waitFor(() => {
      expect(deleteComment).toHaveBeenCalled();
    });
  });
});
