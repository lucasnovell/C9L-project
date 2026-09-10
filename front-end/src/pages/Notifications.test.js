import { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import Login from "./Login";
import Cadastro from "./Cadastro";
import Checkout from "./Checkout";
import { ToastProvider, useToast } from "../components/toast/ToastProvider";
import { login, register } from "../services/AuthService";
import { checkout } from "../services/OrderService";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  useNavigate: () => mockNavigate,
}));
jest.mock("../components/navigation", () => () => <nav />);
jest.mock("../services/AuthService");
jest.mock("../services/OrderService");

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(window, "alert").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(() => {
  expect(window.alert).not.toHaveBeenCalled();
  jest.restoreAllMocks();
  jest.useRealTimers();
});

function renderPage(page) {
  function Pages() {
    const [navigated, setNavigated] = useState(false);
    mockNavigate.mockImplementation(() => setNavigated(true));
    return navigated ? <h1>Página de destino</h1> : page;
  }

  return render(<ToastProvider><Pages /></ToastProvider>);
}

function fill(label, value) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function submit(button) {
  fireEvent.submit(screen.getByRole("button", { name: button }));
}

test("toast de login bem-sucedido permanece após sair da página", async () => {
  login.mockResolvedValue({});
  renderPage(<Login />);
  fill("E-mail", "teste@example.com");
  fill("Senha", "senha-teste");
  submit("Entrar");
  expect(await screen.findByText("Login realizado com sucesso")).not.toBeNull();
  expect(screen.getByText("Página de destino")).not.toBeNull();
  expect(mockNavigate).toHaveBeenCalledWith("/");
});

test("login inválido exibe o texto original sem navegar", async () => {
  login.mockRejectedValue(new Error("Unauthorized"));
  renderPage(<Login />);
  submit("Entrar");
  expect(await screen.findByText("Email ou senha invalidos")).not.toBeNull();
  expect(mockNavigate).not.toHaveBeenCalled();
});

test("cadastro mantém o toast de sucesso após redirecionamento", async () => {
  register.mockResolvedValue({});
  renderPage(<Cadastro />);
  submit("Cadastrar");
  expect(await screen.findByText("Usuário cadastrado com sucesso")).not.toBeNull();
  expect(screen.getByText("Página de destino")).not.toBeNull();
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});

test("cadastro exibe toast de erro", async () => {
  register.mockRejectedValue(new Error("Erro"));
  renderPage(<Cadastro />);
  submit("Cadastrar");
  expect(await screen.findByText("Erro ao cadastrar usuário")).not.toBeNull();
  expect(mockNavigate).not.toHaveBeenCalled();
});

test("senhas diferentes exibem toast sem chamar cadastro", () => {
  renderPage(<Cadastro />);
  fill("Senha", "senha-teste");
  fill("Confirme sua senha", "outra-senha");
  submit("Cadastrar");
  expect(screen.getByText("As senhas não conferem")).not.toBeNull();
  expect(register).not.toHaveBeenCalled();
});

test("checkout incompleto exibe toast sem enviar pedido", () => {
  renderPage(<Checkout />);
  submit("Pagar e finalizar");
  expect(screen.getByText("Preencha todos os campos obrigatórios para finalizar a compra.")).not.toBeNull();
  expect(checkout).not.toHaveBeenCalled();
});

test.each([
  ["Não foi possível finalizar a compra.", []],
  ["Sua sessão expirou. Faça login novamente.", [["/login"]]],
])("checkout exibe toast: %s", async (message, navigationCalls) => {
  checkout.mockRejectedValue(new Error(message));
  renderPage(<Checkout />);
  fill("Rua", "Rua de teste");
  fill("Número", "123");
  fill("CEP", "01000-000");
  fill("Pagamento", "pix");
  submit("Pagar e finalizar");
  expect(await screen.findByText(message)).not.toBeNull();
  expect(mockNavigate.mock.calls).toEqual(navigationCalls);
  expect(Boolean(screen.queryByText("Página de destino"))).toBe(navigationCalls.length > 0);
});

test.each(["success", "error", "auth"])("toast %s desaparece sozinho após 4 segundos", (type) => {
  jest.useFakeTimers();
  function Trigger() {
    const showToast = useToast();
    return <button onClick={() => showToast("Mensagem de teste", type)}>Notificar</button>;
  }

  render(<ToastProvider><Trigger /></ToastProvider>);
  fireEvent.click(screen.getByRole("button", { name: "Notificar" }));
  act(() => jest.advanceTimersByTime(3999));
  expect(screen.getByText("Mensagem de teste")).not.toBeNull();
  act(() => jest.advanceTimersByTime(1));
  expect(screen.queryByText("Mensagem de teste")).toBeNull();
});
