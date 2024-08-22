import { loadData, raiseReachedEnd } from './js/pixabay-api';
import { render } from './js/render-functions';

const mainForm = document.querySelector('.search');

let loader = document.querySelector('div.loader-panel');
let loadMoreBtn = document.querySelector('.load-more');

loader.style.display = 'none';
hideLoadMoreButton();

let currentPage = 1;

function showOrHideLoadMoreButton(loaded) {
  if (loaded.totalHits > currentPage * 15) {
    loadMoreBtn.style.display = 'block';
  } else {
    hideLoadMoreButton();
    raiseReachedEnd();
  }
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function scrollPage() {
  let element = document.querySelector('.result-item');
  let elementHeight = element.getBoundingClientRect()['height'];
  window.scrollBy({
    top: elementHeight * 2,
    left: 0,
    behavior: 'smooth',
  });
}

mainForm.addEventListener('submit', event => {
  hideLoadMoreButton();
  event.preventDefault();
  loader.style.display = 'block';
  const oldElements = document.querySelectorAll('li.result-item');
  const searchQuery = mainForm.elements['search-query'].value;
  if (oldElements && oldElements.length > 0) {
    oldElements.forEach(element => element.remove());
  }

  currentPage = 1;

  loadData(
    searchQuery,
    response => {
      render(response.hits);
      showOrHideLoadMoreButton(response);
    },
    error => console.error(error),
    () => (loader.style.display = 'none'),
    currentPage
  );
});

loadMoreBtn.addEventListener('click', event => {
  hideLoadMoreButton();
  currentPage += 1;
  const searchQuery = mainForm.elements['search-query'].value;
  loadData(
    searchQuery,
    response => {
      render(response.hits);
      showOrHideLoadMoreButton(response);
      scrollPage();
    },
    error => console.error(error),
    () => (loader.style.display = 'none'),
    currentPage
  );
});
