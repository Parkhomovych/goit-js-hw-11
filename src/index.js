import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import { htmlElements, error, goodSearch, createCards } from './js/helpers';

let searchValue = '';
let numbPage = 0;
let stopCounter = 0;

function returnStartValue() {
  htmlElements.btnLoadMore.style.display = 'none';
  htmlElements.sorry.style.display = 'none';
  htmlElements.div.innerHTML = '';
  numbPage = 0;
  stopCounter = 0;
}
function createSearch(search) {
  const BASE_URL = 'https://pixabay.com/api/?';
  const searchParams = new URLSearchParams({
    key: '38997661-54e537908498a57afa3a31c75',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: (numbPage += 1),
    per_page: 40,
  });
  return axios
    .get(`${BASE_URL}${searchParams}`)
    .then(res => {
      if (res.data.totalHits === 0) {
        throw error;
      }
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
}

htmlElements.form.addEventListener('submit', searchFn);
htmlElements.btnLoadMore.addEventListener('click', loadMoreFn);

function searchFn(evt) {
  evt.preventDefault();
  returnStartValue();

  searchValue = evt.target.searchQuery.value;
  createSearch(searchValue)
    .then(res => {
      if (res) {
        htmlElements.div.insertAdjacentHTML('beforeend', createCards(res.hits));
        stopCounter += 40;
        goodSearch(res.totalHits);
        if (res.totalHits >= stopCounter) {
          htmlElements.btnLoadMore.style.display = 'block';
          return;
        }
        htmlElements.sorry.style.display = 'inline-block';
      }
    })
    .catch(err => {
      console.log(err);
    });
}
function loadMoreFn() {
  stopCounter += 40;

  createSearch(searchValue)
    .then(res => {
      if (!res) {
        throw error;
      }
      if (res.totalHits <= stopCounter) {
        htmlElements.sorry.style.display = 'inline-block';
        htmlElements.btnLoadMore.style.display = 'none';
      }
      htmlElements.div.insertAdjacentHTML('beforeend', createCards(res.hits));
    })
    .catch(err => {
      console.log(err);
    });
}
