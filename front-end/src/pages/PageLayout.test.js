import { render, screen } from "@testing-library/react";

import Home from "./Home";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  useNavigate: () => jest.fn(),
}));
jest.mock("../components/navigation", () => () => <nav aria-label="Navegação principal" />);
jest.mock("../components/productCard", () => () => <div data-testid="product-grid" />);
jest.mock("../components/footer", () => () => <footer />);

function renderWithRouter(component) {
  return render(component);
}

test("home usa somente o banner promocional no topo", () => {
  const { container } = renderWithRouter(<Home />);

  expect(container.querySelector(".home-promo-banner")).not.toBeNull();
  expect(container.querySelector(".home-hero")).toBeNull();
  expect(container.querySelector(".home-benefits")).toBeNull();
});

test("login oferece acesso à página de cadastro", () => {
  renderWithRouter(<Login />);

  const registerLink = screen.getByRole("link", { name: "Registre-se." });
  expect(registerLink.getAttribute("href")).toBe("/cadastro");
});
