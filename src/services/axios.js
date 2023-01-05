import axios from 'axios';

export default axios.create({
  baseURL: 'https://coin-keeper-cbc89-default-rtdb.europe-west1.firebasedatabase.app/',
});