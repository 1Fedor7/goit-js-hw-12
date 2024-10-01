import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
document.body.appendChild(loadMoreBtn);

let currentPage = 1;
let currentQuery = '';
const IMAGES_PER_PAGE = 15;
let totalHits = 0;

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

hideLoadMoreBtn();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) {
    showNotification('Please enter a search term.');
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage, IMAGES_PER_PAGE);
    
    if (!response || !response.hits) {
      throw new Error('Invalid response format');
    }

    const images = response.hits;
    totalHits = response.totalHits;

    hideLoader();

    if (images.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(images);

    if (images.length === IMAGES_PER_PAGE) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }

  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showNotification('Something went wrong. Please try again later.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage, IMAGES_PER_PAGE);
    
    if (!response || !response.hits) {
      throw new Error('Invalid response format');
    }

    const images = response.hits;

    hideLoader();

    renderImages(images);

    if (images.length < IMAGES_PER_PAGE || currentPage * IMAGES_PER_PAGE >= totalHits) {
      hideLoadMoreBtn();
      showNotification("We're sorry, but you've reached the end of search results.");
    }

  } catch (error) {
    hideLoader();
    console.error('Error fetching images:', error);
    showNotification('Something went wrong. Please try again later.');
  }
});

function scrollPage() {
  const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

loadMoreBtn.addEventListener('click', async () => {
  await fetchImages(currentQuery, currentPage);
  scrollPage();
});