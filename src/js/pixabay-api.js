const API_KEY = '46204158-4df5f152d7953f3c8acc30a03';
const BASE_URL = 'https://pixabay.com/api/';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${PROXY_URL}${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}