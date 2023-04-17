export const waitFor = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

//colors
function generateRandomcolor() {
  const existingBudegtsLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudegtsLength * 34} 65% 50%`;
}

//local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

//get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

//create budget
export const createBudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomcolor(),
  };
  const existingBudegts = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudegts, newBudget])
  );
};
//create expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  return localStorage.removeItem(key);
};

//delete item
// export const deleteItem = ({ key }) => {
//   return localStorage.removeItem(key);
// };

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    //check if expense.id===budgetId I paased in
    if (expense.budgetId !== budgetId) return acc;

    //add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

//FORMATTING

//format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

//format percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

//format date
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
