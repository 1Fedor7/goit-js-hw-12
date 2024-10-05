import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery, showNotification } from './js/render-functions';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function showLoadMoreBtn() {
  loadMoreBtn.hidden = false;
}

function hideLoadMoreBtn() {
  loadMoreBtn.hidden = true;
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
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
  hideLoadMoreBtn();
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);
    totalHits = images.length;

    hideLoader();

    if (images.length === 0) {
      showNotification('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    renderImages(images);
    showLoadMoreBtn();
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const images = await fetchImages(currentQuery, currentPage);

    hideLoader();
    if (images.length === 0) {
      showNotification("We're sorry, but you've reached the end of search results.");
      hideLoadMoreBtn();
      return;
    }

    renderImages(images);
    scrollPage();
    showLoadMoreBtn();
  } catch (error) {
    hideLoader();
    showNotification('Something went wrong. Please try again later.');
  }
});