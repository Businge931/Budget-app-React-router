import React from "react";
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../Helpers/helpers";
import { useLoaderData } from "react-router-dom";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { toast } from "react-toastify";

//loader
export async function budgetLoader({ params }) {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  if (!budget) {
    throw new Error("The budget you are trying to find does not exist!");
  }
  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  return { budget, expenses };
}

//action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} Added`);
    } catch (error) {
      throw new Error("There was a problem creating your expense");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted");
    } catch (error) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span>{budget.name}</span> expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
