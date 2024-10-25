import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AppProvider } from "../context/AppContext";
import { MyBudgetTracker } from "../views/MyBudgetTracker";
describe("Budget Component", () => {
    it("renders the budget value", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
        const budgetInitialValue = screen.getByText(`Budget: $1000`);
        expect(budgetInitialValue).toBeInTheDocument();
    })
    it("edit budget value", () => {
        render(
            <AppProvider>
                <MyBudgetTracker />
            </AppProvider>
        );
        const budgetInitialValue = screen.getByText(`Budget: $1000`);
        fireEvent.click(budgetInitialValue);
        const budgetInput = screen.getByDisplayValue(`1000`) as HTMLInputElement;
        expect(budgetInput).toBeInTheDocument();
        fireEvent.change(budgetInput, { target: { value: `100` } });
        fireEvent.blur(budgetInput);
        expect(budgetInput.value).toBe(`100`);
    })
})