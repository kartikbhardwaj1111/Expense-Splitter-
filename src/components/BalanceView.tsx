import { Expense } from '../types';
import { calculateBalances, calculateTotalSpending, simplifyDebts } from '../utils/calculations';

interface BalanceViewProps {
  people: string[];
  expenses: Expense[];
}

function BalanceView({ people, expenses }: BalanceViewProps) {
  const balances = calculateBalances(people, expenses);
  const totalSpending = calculateTotalSpending(expenses);
  const settlements = simplifyDebts(balances);

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
      <h2 className="text-gray-700 mb-4 text-2xl border-b-2 border-gray-200 pb-2">
        💰 Balances
      </h2>

      <div className="flex justify-between items-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg mb-6">
        <span>Total Group Spending:</span>
        <strong className="text-2xl">${totalSpending.toFixed(2)}</strong>
      </div>

      <div className="mb-6">
        <h3 className="text-gray-600 my-2 text-lg">Individual Balances</h3>
        {people.map((person) => {
          const balance = balances[person] || 0;
          const isOwed = balance > 0.01;
          const owes = balance < -0.01;
          const isSettled = Math.abs(balance) <= 0.01;
          
          return (
            <div
              key={person}
              className={`flex justify-between items-center px-3 py-3 mb-2 rounded-md transition-all hover:translate-x-1 border ${
                isOwed ? 'bg-green-100 border-green-300' :
                owes ? 'bg-red-100 border-red-300' :
                'bg-gray-100 border-gray-300'
              }`}
            >
              <span className="font-medium text-gray-800">{person}</span>
              <span className="flex items-center gap-2">
                <span className={`text-sm ${
                  isOwed ? 'text-green-700' :
                  owes ? 'text-red-700' :
                  'text-gray-600'
                }`}>
                  {isOwed ? 'is owed' : owes ? 'owes' : 'settled up'}
                </span>
                <strong className={`text-lg ${
                  isOwed ? 'text-green-700' :
                  owes ? 'text-red-700' :
                  'text-gray-600'
                }`}>
                  ${Math.abs(balance).toFixed(2)}
                </strong>
              </span>
            </div>
          );
        })}
      </div>

      {settlements.length === 0 ? (
        <div className="text-center py-8 bg-green-100 rounded-lg text-green-900 font-medium">
          <p>✅ All balances are settled!</p>
        </div>
      ) : (
        <div>
          <h3 className="text-gray-600 my-2 text-lg">Suggested Settlements</h3>
          <div className="space-y-2">
            {settlements.map((settlement, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-3 py-3 bg-blue-50 border border-blue-200 rounded-md"
              >
                <span className="text-gray-800">
                  <strong>{settlement.from}</strong> pays <strong>{settlement.to}</strong>
                </span>
                <strong className="text-blue-700 text-lg">
                  ${settlement.amount.toFixed(2)}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BalanceView;
