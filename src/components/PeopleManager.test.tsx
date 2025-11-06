import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PeopleManager from './PeopleManager';

describe('PeopleManager Component', () => {
  const mockProps = {
    people: ['Alice', 'Bob'],
    onAddPerson: vi.fn(),
    onRemovePerson: vi.fn()
  };

  it('should render people list correctly', () => {
    render(<PeopleManager {...mockProps} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Current Members (2)')).toBeInTheDocument();
  });

  it('should show warning when less than 2 people', () => {
    const propsWithOnePerson = { ...mockProps, people: ['Alice'] };
    render(<PeopleManager {...propsWithOnePerson} />);
    
    expect(screen.getByText(/Add at least 2 people to start tracking expenses/)).toBeInTheDocument();
  });

  it('should call onAddPerson when form is submitted', () => {
    render(<PeopleManager {...mockProps} />);
    
    const input = screen.getByPlaceholderText("Enter person's name");
    const button = screen.getByText('Add Person');
    
    fireEvent.change(input, { target: { value: 'Charlie' } });
    fireEvent.click(button);
    
    expect(mockProps.onAddPerson).toHaveBeenCalledWith('Charlie');
  });

  it('should call onRemovePerson when delete button is clicked', () => {
    render(<PeopleManager {...mockProps} />);
    
    const deleteButtons = screen.getAllByText('❌');
    fireEvent.click(deleteButtons[0]);
    
    expect(mockProps.onRemovePerson).toHaveBeenCalledWith('Alice');
  });
});