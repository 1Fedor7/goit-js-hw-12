import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');

loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more');
document.body.append(loadMoreBtn);

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.add('visible');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('visible');
}

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
  hideLoadMoreButton();
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);
    totalHits = images.totalHits;

    hideLoader();

    if (images.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(images);
    showLoadMoreButton();
  } catch (error) {
    hideLoader();
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
  currentPage += 1;
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);
    hideLoader();

    if (images.length === 0) {
      showNotification("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
      return;
    }

    renderImages(images);
    scrollPage();
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});