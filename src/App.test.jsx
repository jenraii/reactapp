import { test, expect } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import TodoTable from './TodoTable';
import App from "./App";

test("renders App component", () => {
  render(<App />);
  const headline = screen.getByText(/My Todolist/i);
  expect(headline).toBeInTheDocument();
  });

  test('renders todotable', () => {
    const row = [
    {desc: 'Go to coffee', date: '24.01.2023'}
    ];
    render(<TodoTable todos={row} />);
    const table = screen.getByRole('table');
    expect(table).toHaveTextContent((/go to coffee/i));
    });

    test("add todo", () => {
      render(<App />);
      const desc = screen.getByPlaceholderText("Description");
      fireEvent.change(desc, { target: { value: "Go to coffee" } });
      const date = screen.getByPlaceholderText("Date");
      fireEvent.change(date, { target: { value: "29.01.2023" } });
      const button = screen.getByText("Add");
      fireEvent.click(button);
      const table = screen.getByRole("table");
      expect(table).toHaveTextContent(/go to coffee/i);
      });
      
      test("clear todos", () => {
        render(<App />);
        const desc = screen.getByPlaceholderText("Description");
        fireEvent.change(desc, { target: { value: "Go to coffee" } });
        const date = screen.getByPlaceholderText("Date");
        fireEvent.change(date, { target: { value: "29.01.2021" } });
        const button = screen.getByText("Add");
        fireEvent.click(button);
        const tablecell = screen.getByText(/go to coffee/i);
        const removebutton = screen.getByText("Clear");
        fireEvent.click(removebutton);
        expect(tablecell).not.toBeInTheDocument();
      })
