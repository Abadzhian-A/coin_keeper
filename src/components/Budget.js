import React from 'react';
import { useSelector } from 'react-redux';

export const Budget = () => {
  const incomes = useSelector(state => state.budget.incomes);
  const costs = useSelector(state => state.budget.costs);
  const currentUserId = useSelector(state => state.user.id);

  const budget = incomes
    .filter(income => income.userId === currentUserId)
    .reduce((previousValue, { income }) => previousValue + +income, 0)
    - costs
      .filter(cost => cost.userId === currentUserId)
      .reduce((previousValue, { cost }) => previousValue + +cost, 0);

  return <h1>Доступні кошти { budget }</h1>;
};
