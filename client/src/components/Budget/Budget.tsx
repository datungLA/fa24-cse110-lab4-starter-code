import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [edit, setEdit] = useState<boolean>(false);
  const [editBudget, setEditBudget] = useState<number>(budget)
  const handleBlur = () => {
    setBudget(editBudget)
    setEdit(false)
  }
  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {edit ? (<input type="text" value={editBudget} onChange={(e) => setEditBudget(Number(e.target.value))} onBlur={handleBlur} autoFocus />) : (
        <div onClick={() => setEdit(true)}>Budget: ${budget}</div>
      )}
    </div>
  );
};

export default Budget;
