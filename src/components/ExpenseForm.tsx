import { useState } from 'react';
import { Expense } from '../types';

interface ExpenseFormProps {
  people: string[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

function ExpenseForm({ people, onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paidBy, setPaidBy] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [splitBetween, setSplitBetween] = useState<string[]>([]);
  const [customAmounts, setCustomAmounts] = useState<{ [person: string]: number }>({});
  const [error, setError] = useState('');

  const handleSplitBetweenChange = (person: string, checked: boolean) => {
    if (checked) {
      setSplitBetween([...splitBetween, person]);
    } else {
      setSplitBetween(splitBetween.filter(p => p !== person));
      if (splitType === 'custom') {
        const newCustomAmounts = { ...customAmounts };
        delete newCustomAmounts[person];
        setCustomAmounts(newCustomAmounts);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (!paidBy) {
      setError('Please select who paid');
      return;
    }
    if (splitBetween.length === 0) {
      setError('Please select at least one person to split between');
      return;
    }
    if (splitType === 'custom') {
      const totalCustom = Object.values(customAmounts).reduce((sum, amt) => sum + amt, 0);
      if (Math.abs(totalCustom - parseFloat(amount)) > 0.01) {
        setError('Custom amounts must add up to the total expense amount');
        return;
      }
    }

    const expense: Omit<Expense, 'id'> = {
      description: description.trim(),
      amount: parseFloat(amount),
      paidBy,
      date,
      splitBetween,
      splitType,
      customAmounts: splitType === 'custom' ? customAmounts : undefined
    };

    onAddExpense(expense);
    
    // Reset form
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setPaidBy('');
    setSplitType('equal');
    setSplitBetween([]);
    setCustomAmounts({});
    setError('');
  };

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        💸 Add Expense
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-1 text-gray-700 font-medium text-sm"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was the expense for?"
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base transition-colors focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 mb-4">
            <label
              htmlFor="amount"
              className="block mb-1 text-gray-700 font-medium text-sm"
            >
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base transition-colors focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex-1 mb-4">
            <label
              htmlFor="date"
              className="block mb-1 text-gray-700 font-medium text-sm"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base transition-colors focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="paidBy"
            className="block mb-1 text-gray-700 font-medium text-sm"
          >
            Paid By
          </label>
          <select
            id="paidBy"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded-md text-base transition-colors focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="">Select person...</option>
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Split Type
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer px-1 py-1 rounded transition-colors hover:bg-gray-50">
              <input
                type="radio"
                value="equal"
                name="splitType"
                checked={splitType === 'equal'}
                onChange={(e) => setSplitType(e.target.value as 'equal' | 'custom')}
                className="cursor-pointer"
              />
              <span>Equal Split</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer px-1 py-1 rounded transition-colors hover:bg-gray-50">
              <input
                type="radio"
                value="custom"
                name="splitType"
                checked={splitType === 'custom'}
                onChange={(e) => setSplitType(e.target.value as 'equal' | 'custom')}
                className="cursor-pointer"
              />
              <span>Custom Amounts</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium text-sm">
            Split Between
          </label>
          <div className="flex flex-col gap-2">
            {people.map((person) => (
              <div
                key={person}
                className="flex items-center justify-between p-2 bg-gray-50 rounded mb-1"
              >
                <label className="flex items-center gap-2 cursor-pointer px-1 py-1 rounded transition-colors hover:bg-gray-50">
                  <input 
                    type="checkbox" 
                    checked={splitBetween.includes(person)}
                    onChange={(e) => handleSplitBetweenChange(person, e.target.checked)}
                    className="cursor-pointer" 
                  />
                  <span>{person}</span>
                </label>
                {splitType === 'custom' && splitBetween.includes(person) && (
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={customAmounts[person] || ''}
                    onChange={(e) => setCustomAmounts({
                      ...customAmounts,
                      [person]: parseFloat(e.target.value) || 0
                    })}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {error && (
          <p className="bg-red-100 text-red-900 px-3 py-2 rounded-md mb-4">
            {error}
          </p>
        )}
        
        <button
          type="submit"
          disabled={people.length < 2}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md text-sm font-medium cursor-pointer transition-all hover:bg-indigo-600 hover:-translate-y-px flex items-center justify-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
