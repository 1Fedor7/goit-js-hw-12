import axios from 'axios';

const API_KEY = '46204158-4df5f152d7953f3c8acc30a03';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const { data } = await axios.get(url);
    return data.hits;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}