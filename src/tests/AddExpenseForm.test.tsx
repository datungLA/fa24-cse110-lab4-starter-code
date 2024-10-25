import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import { AppProvider } from "../context/AppContext";
import { MyBudgetTracker } from "../views/MyBudgetTracker";

describe("Add Expense Form Component", () => {
    it("Render expense form", () => {
        render(<AppProvider>
            <MyBudgetTracker />
        </AppProvider>)
        const nameTitle = screen.getByText('Name');
        const costTitle = screen.getByText('Cost');
        const saveButton = screen.getByRole('button', { name: /Save/i });
        expect(nameTitle).toBeInTheDocument();
        expect(costTitle).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
    })
    it("Submitting expense form", () => {
        render(<AppProvider>
            <MyBudgetTracker />
        </AppProvider>)
        const saveButton = screen.getByRole(`button`, { name: /Save/i });
        const nameInput = screen.getByTestId(`name-input`) as HTMLInputElement;
        const costInput = screen.getByTestId(`cost-input`) as HTMLInputElement;

        // empty form
        fireEvent.click(saveButton);
        expect(nameInput).toBeInvalid();
        expect(costInput).toBeInvalid();

        // populate form
        fireEvent.change(nameInput, { target: { value: `Gas` } });
        fireEvent.change(costInput, { target: { value: `10` } });
        expect(nameInput.value).toBe('Gas')
        expect(costInput.value).toBe('10')
        fireEvent.click(saveButton);

        // form should be cleared after submission
        expect(nameInput.value).toBe('')
        expect(costInput.value).toBe('')

        // expense list verification
        const newExpenseName = screen.getByText('Gas');
        const newexpenseCost = screen.getByText('$10');
        expect(newExpenseName).toBeInTheDocument();
        expect(newexpenseCost).toBeInTheDocument();

        // balance verification
        const remainingBalance = screen.getByText('Remaining: $990');
        expect(remainingBalance).toBeInTheDocument();
        const spendedAmount = screen.getByText('Spent so far: $10');
        expect(spendedAmount).toBeInTheDocument();

    })
})