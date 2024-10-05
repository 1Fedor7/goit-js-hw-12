import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let loadedImages = 0;

function showLoadMoreBtn() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreBtn() {
  loadMoreBtn.style.display = 'none';
}

hideLoadMoreBtn();

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
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
  loadedImages = 0;

  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage);
    hideLoader();

    const images = response.hits;
    totalHits = response.totalHits;
    loadedImages += images.length;

    if (images.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(images);

    if (images.length === 15 && loadedImages < totalHits) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const response = await fetchImages(currentQuery, currentPage);
    hideLoader();

    const images = response.hits;
    loadedImages += images.length;

    if (images.length === 0) {
      showNotification("We're sorry, but you've reached the end of search results.");
      hideLoadMoreBtn();
      return;
    }

    renderImages(images);

    if (loadedImages >= totalHits || images.length < 15) {
      hideLoadMoreBtn();
      showNotification("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});