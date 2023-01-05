import axios from '../services/axios';

const apiIncomes = {
  getIncomes: () => {
    return axios.get('incomes.json');
  },
  postIncomes: data => {
    return axios.post('incomes.json', data);
  },
};
export default apiIncomes;
