import { Expense, Balance, SimplifiedDebt } from '../types';

export const calculateBalances = (people: string[], expenses: Expense[]): Balance => {
  const balances: Balance = {};
  
  // Initialize balances
  people.forEach(person => {
    balances[person] = 0;
  });

  expenses.forEach(expense => {
    // Add amount paid by person
    balances[expense.paidBy] += expense.amount;

    // Subtract what each person owes
    if (expense.splitType === 'equal') {
      const amountPerPerson = expense.amount / expense.splitBetween.length;
      expense.splitBetween.forEach(person => {
        balances[person] -= amountPerPerson;
      });
    } else if (expense.splitType === 'custom' && expense.customAmounts) {
      Object.entries(expense.customAmounts).forEach(([person, amount]) => {
        balances[person] -= amount;
      });
    }
  });

  return balances;
};

export const calculateTotalSpending = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const simplifyDebts = (balances: Balance): SimplifiedDebt[] => {
  const creditors: Array<{ person: string; amount: number }> = [];
  const debtors: Array<{ person: string; amount: number }> = [];

  // Separate creditors and debtors
  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0.01) {
      creditors.push({ person, amount: balance });
    } else if (balance < -0.01) {
      debtors.push({ person, amount: -balance });
    }
  });

  const settlements: SimplifiedDebt[] = [];
  let i = 0, j = 0;

  while (i < creditors.length && j < debtors.length) {
    const creditor = creditors[i];
    const debtor = debtors[j];
    
    const amount = Math.min(creditor.amount, debtor.amount);
    
    settlements.push({
      from: debtor.person,
      to: creditor.person,
      amount: Math.round(amount * 100) / 100
    });

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount < 0.01) i++;
    if (debtor.amount < 0.01) j++;
  }

  return settlements;
};