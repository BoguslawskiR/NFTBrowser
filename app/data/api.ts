import axios from "axios";

export default axios.create({
  baseURL: 'https://api.looksrare.org/api',
  headers: {
    Accept: 'application/json',
  },
});