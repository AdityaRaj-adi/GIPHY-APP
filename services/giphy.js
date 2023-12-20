
import axios from 'axios';

const API_KEY = 'wXEJqmpcRr37XoTQ3oqZduZPYnN8J7y4';

const giphy = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: API_KEY,
 },
});