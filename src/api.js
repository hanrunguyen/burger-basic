import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-9a540.firebaseio.com/'
});

export const getCancelTokenSource = () => {
  const CancelToken = axios.CancelToken;
  return CancelToken.source();
};

export default instance;
