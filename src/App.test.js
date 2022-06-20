import App from "./App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("App tests", () => {
  it("should display header title", () => {
    render(<App />);
    const Header = screen.getByRole("heading", { name: "Suma de valores" });

    expect(Header).toBeInTheDocument();
  });

  it("should display the result of the addition", async () => {
    render(<App />);
    const FirstInput = screen.getByLabelText("first number");
    const SecondInput = screen.getByLabelText("second number");

    userEvent.type(FirstInput, "3");
    userEvent.type(SecondInput, "2");

    userEvent.click(screen.getByText("Add"));

    expect(await screen.findByText("5")).toBeInTheDocument();
  });
});
