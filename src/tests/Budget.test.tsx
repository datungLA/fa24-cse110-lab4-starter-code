import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Budget from "../components/Budget/Budget";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { Expense } from "../types/types";
describe("Budget Component", () => {
    it("renders the budget value", () => {
        const mockBudgetValue = 1000;
        const mockSetBudget = jest.fn();
        const mockExpenses: Expense[] = [];
        const mockSetExpenses = jest.fn()
        render(
            <AppContext.Provider value={{ expenses: mockExpenses, setExpenses: mockSetExpenses, budget: mockBudgetValue, setBudget: mockSetBudget }}>
                <Budget />
            </AppContext.Provider >
        )
        const budgetInitialValue = screen.getByText(`Budget: $${mockBudgetValue}`);
        expect(budgetInitialValue).toBeInTheDocument();
    })
    it("edit budget value", () => {
        const mockBudgetValue = 1000;
        const updatedBudgetValue = 1500;
        const mockSetBudget = jest.fn()
        const TestComponent = () => {
            const mockExpenses: Expense[] = [];
            const mockSetExpenses = jest.fn()
            const [budget, setBudget] = useState(mockBudgetValue);
            return (
                <AppContext.Provider value={{ expenses: mockExpenses, setExpenses: mockSetExpenses, budget, setBudget }}>
                    <Budget />
                </AppContext.Provider>
            )
        }
        render(<TestComponent />);
        const budgetInitialValue = screen.getByText(`Budget: $${mockBudgetValue}`);
        fireEvent.click(budgetInitialValue);

        const budgetInputField = screen.getByDisplayValue(`${mockBudgetValue}`);
        fireEvent.change(budgetInputField, { target: { value: updatedBudgetValue } });

        fireEvent.blur(budgetInputField);

        const newBudget = screen.getByText(`Budget: $${updatedBudgetValue}`);
        expect(newBudget).toBeInTheDocument();
    })
})