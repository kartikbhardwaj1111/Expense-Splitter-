import { describe, it, expect } from 'vitest';
import { calculateBalances, calculateTotalSpending, simplifyDebts } from './calculations';
import { Expense } from '../types';

describe('Expense Splitter Calculations', () => {
  const mockPeople = ['Alice', 'Bob', 'Charlie'];
  
  const mockExpenses: Expense[] = [
    {
      id: 1,
      description: 'Lunch',
      amount: 60,
      paidBy: 'Alice',
      splitBetween: ['Alice', 'Bob', 'Charlie'],
      date: '2024-01-01',
      splitType: 'equal'
    }
  ];

  it('should calculate balances correctly for equal split', () => {
    const balances = calculateBalances(mockPeople, mockExpenses);
    
    expect(balances['Alice']).toBe(40); // Paid 60, owes 20
    expect(balances['Bob']).toBe(-20);  // Paid 0, owes 20
    expect(balances['Charlie']).toBe(-20); // Paid 0, owes 20
  });

  it('should calculate total spending correctly', () => {
    const total = calculateTotalSpending(mockExpenses);
    expect(total).toBe(60);
  });

  it('should simplify debts correctly', () => {
    const balances = { 'Alice': 40, 'Bob': -20, 'Charlie': -20 };
    const settlements = simplifyDebts(balances);
    
    expect(settlements).toHaveLength(2);
    expect(settlements[0].from).toBe('Bob');
    expect(settlements[0].to).toBe('Alice');
    expect(settlements[0].amount).toBe(20);
  });

  it('should handle empty expenses', () => {
    const balances = calculateBalances(mockPeople, []);
    const total = calculateTotalSpending([]);
    
    expect(balances['Alice']).toBe(0);
    expect(total).toBe(0);
  });
});