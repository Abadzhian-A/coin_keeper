import Cookies from 'universal-cookie';
import { getCosts, getIncomes } from '../Store/Slices/budgetSlice';
import { store } from '../Store';
import incomesApi from '../API/incomes';
import costsApi from '../API/costs';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const cookies = new Cookies();

export function isAuth() {
  return !!cookies.get('token');
}

export async function fetchDataBudget() {
  const { dispatch } = store;
  const responseToIncomes = await incomesApi.getIncomes();
  const responseToCosts = await costsApi.getCosts();

  dispatch(getIncomes(Object.values(responseToIncomes?.data || {})));
  dispatch(getCosts(Object.values(responseToCosts?.data || {})));
}

export const useAuth = () => {
  const userId = useSelector(state => state.user.id);
  return userId && isAuth();
};

export const BudgetPerDay = () => {
  const incomes = useSelector(state => state.budget.incomes);
  const costs = useSelector(state => state.budget.costs);
  const currentUserId = useSelector(state => state.user.id);
  const currentDate = moment();
  const lastDateOfMonth = moment().endOf('M');

  const budgetPerDay = (incomes
      .filter(income => income.userId === currentUserId)
      .reduce((previousValue, { income }) => previousValue + +income, 0)
    - costs
      .filter(cost => cost.userId === currentUserId)
      .reduce((previousValue, { cost }) => previousValue + +cost, 0)) / ((lastDateOfMonth.diff(currentDate, 'd')+1));

  return budgetPerDay.toFixed(2);
};
