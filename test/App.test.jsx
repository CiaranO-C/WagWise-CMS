import { describe, expect, test } from "vitest";
import { render, screen } from "./CustomRender";
import userEvent from "@testing-library/user-event";

describe("App index route render tests", () => {
  test("Renders landing page as index", () => {
    render();
    expect(
      screen.getByRole("heading", { name: "Admin Login" }),
    ).toBeInTheDocument();
  });

  test("Renders login and guest buttons", () => {
    render();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Guest Account" }),
    ).toBeInTheDocument();
  });

  test("Renders header with logo image", () => {
    render();
    expect(screen.getByAltText("wagwise logo")).toBeInTheDocument();
  });

  test("Renders links to Blog and Github", () => {
    render();
    expect(screen.getByRole("link", { name: "User Site" })).toBeInTheDocument();
    const gitLink = screen.getAllByRole("link")[1];
    expect(gitLink).toBeInTheDocument();
    const href = gitLink.getAttribute("href");
    expect(href).toEqual("https://github.com/CiaranO-C/wagwise-cms");
  });
});

describe("Login page user event test", () => {
  test("User can enter details into inputs", async () => {
    const user = userEvent.setup();
    render();
    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    await user.click(username);
    await user.keyboard("username");
    await user.click(password);
    await user.keyboard("password");

    expect(username).toHaveValue("username");
    expect(password).toHaveValue("password");
  });

  test("User can click guest button to fill out form with guest details", async () => {
    const user = userEvent.setup();
    render();
    const button = screen.getByRole("button", { name: "Guest Account" });
    const username = screen.getByLabelText("Username");
    const password = screen.getByLabelText("Password");
    await user.click(button);

    expect(username).toHaveValue("Admin");
    expect(password).toHaveValue("adminPass1");
  });
});
