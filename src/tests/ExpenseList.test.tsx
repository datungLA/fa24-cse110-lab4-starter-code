import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AppProvider } from "../context/AppContext";
import { MyBudgetTracker } from "../views/MyBudgetTracker";

describe("ExpenseItem Component", () => {
  it("renders expense items", () => {
    render(<AppProvider>
      <MyBudgetTracker />
    </AppProvider>)

    const saveButton = screen.getByRole(`button`, { name: /Save/i });
    const nameInput = screen.getByTestId(`name-input`) as HTMLInputElement;
    const costInput = screen.getByTestId(`cost-input`) as HTMLInputElement;

    // populate form
    fireEvent.change(nameInput, { target: { value: `Gas` } });
    fireEvent.change(costInput, { target: { value: `10` } });
    fireEvent.click(saveButton);

    // expense list verification
    const newExpenseName = screen.getByText('GS');
    const newexpenseCost = screen.getByText('$10');
    expect(newExpenseName).toBeInTheDocument();
    expect(newexpenseCost).toBeInTheDocument();
  });

  it("edits an expense item", () => {
    render(<AppProvider>
      <MyBudgetTracker />
    </AppProvider>)

    const saveButton = screen.getByRole(`button`, { name: /Save/i });
    const nameInput = screen.getByTestId(`name-input`) as HTMLInputElement;
    const costInput = screen.getByTestId(`cost-input`) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: `Gas` } });
    fireEvent.change(costInput, { target: { value: `10` } });
    fireEvent.click(saveButton);

    // Click to edit the first expense name
    let ExpenseName = screen.getByText('Gas');
    let expenseCost = screen.getByText('$10');

    fireEvent.click(ExpenseName);
    ExpenseName = screen.getByDisplayValue('Gas')
    fireEvent.change(ExpenseName, { target: { value: "Water" } });
    fireEvent.blur(ExpenseName); // simulate losing focus to trigger the save

    fireEvent.click(expenseCost);
    expenseCost = screen.getByDisplayValue('10');
    fireEvent.change(expenseCost, { target: { value: "20" } });
    fireEvent.blur(expenseCost); // simulate losing focus to trigger the save

    // Check if the expense name has been updated
    const newExpenseName = screen.getByText('Water');
    const newexpenseCost = screen.getByText('$20');
    expect(newExpenseName).toBeInTheDocument();
    expect(newexpenseCost).toBeInTheDocument();
  });

  it("deletes an expense item", () => {
    render(<AppProvider>
      <MyBudgetTracker />
    </AppProvider>)

    const saveButton = screen.getByRole(`button`, { name: /Save/i });
    const nameInput = screen.getByTestId(`name-input`) as HTMLInputElement;
    const costInput = screen.getByTestId(`cost-input`) as HTMLInputElement;

    // populate form
    fireEvent.change(nameInput, { target: { value: `Gas` } });
    fireEvent.change(costInput, { target: { value: `10` } });
    fireEvent.click(saveButton);

    const newExpenseName = screen.getByText('Gas');
    const newexpenseCost = screen.getByText('$10');
    expect(newExpenseName).toBeInTheDocument();
    expect(newexpenseCost).toBeInTheDocument();

    // Delete the second expense
    const deleteButtons = screen.getAllByTestId("delete");
    fireEvent.click(deleteButtons[0]);

    expect(newExpenseName).not.toBeInTheDocument();
    expect(newexpenseCost).not.toBeInTheDocument();
  });
});
