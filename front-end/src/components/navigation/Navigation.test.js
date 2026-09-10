import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navigation from "./index";
import SiteFooter from "../footer";
import Cadastro from "../../pages/Cadastro";
import { ToastProvider } from "../toast/ToastProvider";
import { getLoggedUser, removeToken } from "../../services/AuthService";

const mockNavigate = jest.fn();
const mockLocation = { pathname: "/", search: "" };
const mockParams = new URLSearchParams();
let viewportChanged;

jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useSearchParams: () => [mockParams],
}));
jest.mock("../../services/AuthService");

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  getLoggedUser.mockResolvedValue(null);
  window.matchMedia = jest.fn(() => ({
    addEventListener: (event, listener) => { viewportChanged = listener; },
    removeEventListener: jest.fn(),
  }));
});

async function renderNavigation() {
  render(<Navigation variant="home" />);
  await waitFor(() => expect(getLoggedUser).toHaveBeenCalled());
}

test("busca abre com foco e Escape devolve foco ao botão", async () => {
  await renderNavigation();
  const toggle = screen.getByRole("button", { name: "Abrir busca" });
  fireEvent.click(toggle);
  const input = screen.getByRole("searchbox", { name: "Buscar no catálogo" });
  expect(input).toHaveFocus();
  expect(toggle.getAttribute("aria-expanded")).toBe("true");
  fireEvent.keyDown(input, { key: "Escape" });
  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  expect(toggle).toHaveFocus();
});

test("botão voltar fecha busca e mantém o texto digitado", async () => {
  await renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Abrir busca" }));
  const input = screen.getByRole("searchbox");
  fireEvent.change(input, { target: { value: "notebook" } });
  fireEvent.click(screen.getByRole("button", { name: "Fechar busca e voltar à navegação" }));
  expect(input.value).toBe("notebook");
  expect(screen.getByRole("button", { name: "Abrir busca" }).getAttribute("aria-expanded")).toBe("false");
});

test("busca preserva histórico e rota e fecha o modo compacto", async () => {
  await renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Abrir busca" }));
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: " mouse gamer " } });
  fireEvent.submit(screen.getByRole("search"));
  expect(mockNavigate).toHaveBeenCalledWith("/busca?q=mouse%20gamer");
  expect(JSON.parse(localStorage.getItem("recentProductSearches"))).toEqual(["mouse gamer"]);
  expect(screen.getByRole("button", { name: "Abrir busca" }).getAttribute("aria-expanded")).toBe("false");
});

test("trocar de breakpoint fecha busca e menu", async () => {
  await renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: "Abrir busca" }));
  act(() => viewportChanged());
  expect(screen.getByRole("button", { name: "Abrir busca" }).getAttribute("aria-expanded")).toBe("false");
  expect(screen.getByRole("button", { name: "Abrir menu" }).getAttribute("aria-expanded")).toBe("false");
});

test("conta oferece login e permite sair sem alterar autenticação", async () => {
  getLoggedUser.mockResolvedValue({ name: "Cliente Teste" });
  await renderNavigation();
  fireEvent.click(screen.getByRole("button", { name: /Sair da conta/ }));
  expect(removeToken).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith("/");
  expect(screen.getByRole("link", { name: /Entrar ou cadastrar/ }).getAttribute("href")).toBe("/login");
});

test("cadastro oferece link para entrar", () => {
  render(<ToastProvider><Cadastro /></ToastProvider>);
  expect(screen.getByRole("link", { name: "Entrar." }).getAttribute("href")).toBe("/login");
});

test("rodapé informa que o projeto é de estudo e não uma loja real", () => {
  render(<SiteFooter />);
  expect(screen.getByText(/Este site é um projeto de estudo.*Não é uma loja real/)).not.toBeNull();
});
