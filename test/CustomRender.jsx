/* eslint-disable react-refresh/only-export-components */

import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import MockAuthProvider from "./mocks/MockAuthProvider";
import App from "../src/app/App";
import Login from "../src/app/routes/Login";
import ErrorPage from "../src/app/routes/Error";

const ProvidersRouter = ({ children, initialEntries = ["/"], userState }) => {
  return (
    <MockAuthProvider value={userState}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<App />} errorElement={<ErrorPage />}>
            <Route index={true} element={<Login />} />
            {children}
          </Route>
        </Routes>
      </MemoryRouter>
    </MockAuthProvider>
  );
};

const customRender = (ui, { initialEntries, userState, ...options } = {}) =>
  render(ui, {
    wrapper: (props) => (
      <ProvidersRouter
        {...props}
        initialEntries={initialEntries}
        userState={userState}
      />
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
