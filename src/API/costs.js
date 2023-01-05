import axios from '../services/axios';

const apiCosts = {
  getCosts: () => {
    return axios.get('costs.json');
  },
  postCosts: data => {
    return axios.post('costs.json', data);
  },
};
export default apiCosts;