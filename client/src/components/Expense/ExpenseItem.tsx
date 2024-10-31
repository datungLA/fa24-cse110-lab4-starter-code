import { useContext, useState } from "react";
import { Expense } from "../../types/types";
import { AppContext } from "../../context/AppContext";

const ExpenseItem = (currentExpense: Expense) => {
  // Exercise: Consume the AppContext here
  const { expenses, setExpenses } = useContext(AppContext)
  const [editField, setEditField] = useState<string | null>(null);
  const [editExpense, setEditExpense] = useState<Expense>(currentExpense);
  const handleDeleteExpense = (currentExpense: Expense) => {
    // Exercise: Remove expense from expenses context array
    const updatedExpense = expenses.filter((expense) => expense.id !== currentExpense.id)
    setExpenses(updatedExpense);
  };
  const handleEditExpense = () => {
    const updatedExpense = expenses.map((expense) => expense.id === currentExpense.id ? { ...expense, description: editExpense.description, cost: editExpense.cost } : expense);
    setExpenses(updatedExpense);
    setEditField(null);
  };
  const handleBlur = () => {
    handleEditExpense();
  }
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {editField === "name" ? (
          <input type="text" value={editExpense.description} onChange={(e) => setEditExpense({ ...editExpense, description: e.target.value })} onBlur={handleBlur} autoFocus />
        ) : (
          <div onClick={() => setEditField("name")}>{currentExpense.description}</div>
        )
        }
      </div>
      <div>
        {editField === "cost" ? (
          <input type="text" value={editExpense.cost} onChange={(e) => setEditExpense({ ...editExpense, cost: Number(e.target.value) })} onBlur={handleBlur} autoFocus />
        ) : (
          <div onClick={() => setEditField("cost")}>${currentExpense.cost}</div>
        )
        }
      </div>
      <button data-testid="delete" onClick={() => handleDeleteExpense(currentExpense)}>x</button>
    </li >
  );
};

export default ExpenseItem;
