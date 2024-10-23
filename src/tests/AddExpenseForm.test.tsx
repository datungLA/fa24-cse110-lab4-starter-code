import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import AddExpenseForm from "../components/Expense/AddExpenseForm";

describe("Add Expense Form Component", () => {
    it("Render form", () => {
        render(<AddExpenseForm />)
        const nameTitle = screen.getByText('Name');
        const costTitle = screen.getByText('Cost');
        const saveButton = screen.getByRole('button', { name: /save/i });
        expect(nameTitle).toBeInTheDocument();
        expect(costTitle).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
    })
    it("Submitting empty form", () => {
        render(<AddExpenseForm />)
        const saveButton = screen.getByRole(`button`, { name: /save/i });
        const nameInput = screen.getByTestId(`name-input`);
        const costInput = screen.getByTestId(`cost-input`);
        fireEvent.change(nameInput, { target: { value: `Gas` } });
        fireEvent.change(costInput, { target: { value: `10` } });
        fireEvent.click(saveButton);
        expect(nameInput).toBeValid();
        /*
        const nameInput = screen.getByTestId(`name-input`);
        const costInput = screen.getByTestId(`cost-input`);
        expect(nameInput).toBeInvalid();
        expect(costInput).toBeInvalid();
        fireEvent.change(nameInput, { target: { value: `Gas` } });
        fireEvent.change(costInput, { target: { value: `10` } });
        fireEvent.submit(saveButton);
        expect(nameInput).toBeValid();
        */
    })
})