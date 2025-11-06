import { useState } from 'react';
import BalanceView from './components/BalanceView';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PeopleManager from './components/PeopleManager';
import { Expense } from './types';
import { initialPeople, initialExpenses } from './initialData';

function App() {
  const [people, setPeople] = useState<string[]>(initialPeople);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const addPerson = (name: string) => {
    if (name.trim() && !people.includes(name.trim())) {
      setPeople([...people, name.trim()]);
      return true;
    }
    return false;
  };

  const removePerson = (name: string) => {
    setPeople(people.filter(person => person !== name));
    // Remove person from existing expenses
    setExpenses(expenses.map(expense => ({
      ...expense,
      splitBetween: expense.splitBetween.filter(person => person !== name),
      customAmounts: expense.customAmounts ? 
        Object.fromEntries(Object.entries(expense.customAmounts).filter(([person]) => person !== name)) : 
        undefined
    })).filter(expense => expense.paidBy !== name && expense.splitBetween.length > 0));
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Math.max(0, ...expenses.map(e => e.id)) + 1
    };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <header className="bg-white/10 backdrop-blur-md p-6 text-center border-b border-white/20">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">💰 Expense Splitter</h1>
      </header>

      <main className="p-8">
        <div className="max-w-7xl mx-auto flex gap-8" style={{ minWidth: '1000px' }}>
          <div style={{ width: '50%', minWidth: '500px' }}>
            <PeopleManager 
              people={people}
              onAddPerson={addPerson}
              onRemovePerson={removePerson}
            />
            <ExpenseForm 
              people={people}
              onAddExpense={addExpense}
            />
          </div>

          <div style={{ width: '50%', minWidth: '500px' }}>
            <BalanceView 
              people={people}
              expenses={expenses}
            />
            <ExpenseList 
              expenses={expenses}
              onRemoveExpense={removeExpense}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
