import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [editBudget, setEditBudget] = useState<number>(budget)
  const handleBlur = async() => {
    setEdit(false)
    try {
      const newBudget = await updateBudget(editBudget);
      loadBudget();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
  }, []);

  // Function to load expenses and handle errors
  const loadBudget = async () => {
    try {
      const newBudget = await fetchBudget();
      setBudget(newBudget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {edit ? (<input type="text" value={editBudget} onChange={(e) => setEditBudget(Number(e.target.value))} onBlur={handleBlur} autoFocus />) : (
        <div onClick={() => setEdit(true)}>Budget: ${budget}</div>
      )}
    </div>
  );
};

export default Budget;
