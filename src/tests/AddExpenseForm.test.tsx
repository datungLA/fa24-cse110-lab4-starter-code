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
    it("Submitting empty form ")
})