import { act, fireEvent, render, screen } from "@testing-library/react";

import ProductPage from "./ProductPage";
import Toast from "../components/toast";
import { ToastProvider } from "../components/toast/ToastProvider";
import { getProductsInfo } from "../services/ProductService";
import { addCartItem } from "../services/CartService";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));
jest.mock("../components/navigation", () => () => <nav />);
jest.mock("../components/footer", () => () => <footer />);
jest.mock("../services/ProductService");
jest.mock("../services/CartService");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(window, "alert").mockImplementation(() => {});
  getProductsInfo.mockResolvedValue([{ id: 1, name: "Teclado", price: 100, description: "Teclado USB" }]);
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

async function addProduct() {
  render(<ToastProvider><ProductPage /></ToastProvider>);
  fireEvent.click(await screen.findByRole("button", { name: "Adicionar ao carrinho" }));
}

test("usuário não autenticado recebe toast com o texto original e pode fechá-lo", async () => {
  addCartItem.mockRejectedValue(new Error("Usuário não autenticado."));
  await addProduct();

  expect(await screen.findByText("Usuário não autenticado.")).not.toBeNull();
  expect(window.alert).not.toHaveBeenCalled();
  expect(mockNavigate).not.toHaveBeenCalled();
  expect(addCartItem).toHaveBeenCalledWith(1, 1);

  fireEvent.click(screen.getByRole("button", { name: "Fechar notificação" }));
  expect(screen.queryByText("Usuário não autenticado.")).toBeNull();
});

test("sucesso ao adicionar recebe toast com o texto original", async () => {
  addCartItem.mockResolvedValue({});
  await addProduct();
  expect(await screen.findByText("Produto adicionado ao carrinho.")).not.toBeNull();
  expect(window.alert).not.toHaveBeenCalled();
});

test("sessão expirada recebe toast e mantém redirecionamento", async () => {
  addCartItem.mockRejectedValue(new Error("Sua sessão expirou. Faça login novamente."));
  await addProduct();
  expect(await screen.findByText("Sua sessão expirou. Faça login novamente.")).not.toBeNull();
  expect(window.alert).not.toHaveBeenCalled();
  expect(mockNavigate).toHaveBeenCalledWith("/login");
});

test("toast pausa o fechamento durante hover e foco e reinicia ao receber outra notificação", () => {
  jest.useFakeTimers();
  const onClose = jest.fn();
  const notification = { message: "Usuário não autenticado." };
  const { rerender, unmount } = render(<Toast notification={notification} onClose={onClose} />);
  const closeButton = screen.getByRole("button", { name: "Fechar notificação" });

  fireEvent.mouseEnter(screen.getByText(notification.message));
  act(() => jest.advanceTimersByTime(10000));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.mouseLeave(screen.getByText(notification.message));
  fireEvent.focus(closeButton);
  act(() => jest.advanceTimersByTime(10000));
  expect(onClose).not.toHaveBeenCalled();
  fireEvent.blur(closeButton);
  act(() => jest.advanceTimersByTime(3000));
  rerender(<Toast notification={{ ...notification }} onClose={onClose} />);
  act(() => jest.advanceTimersByTime(3000));
  expect(onClose).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(1000));
  expect(onClose).toHaveBeenCalledTimes(1);
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});
