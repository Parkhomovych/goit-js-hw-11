import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import { error, totalHitsFn, createCards, htmlElements } from './js/helpers';
let numbPage = 0;
let searchValue = '';
let stopCounter = 0;

function createSearch(search) {
  const BASE_URL = 'https://pixabay.com/api?';
  const searchParams = new URLSearchParams({
    key: '38997661-54e537908498a57afa3a31c75',
    q: search,
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
    .catch(() => {
      error();
    });
}

htmlElements.form.addEventListener('submit', searchFn);
htmlElements.btnLoadMore.addEventListener('click', loadMoreFn);

function searchFn(evt) {
  evt.preventDefault();
  htmlElements.btnLoadMore.style.display = 'none';
  htmlElements.div.innerHTML = '';
  numbPage = 0;
  stopCounter = 0;
  searchValue = evt.target.searchQuery.value;
  createSearch(searchValue)
    .then(res => {
      if (res) {
        htmlElements.div.insertAdjacentHTML('beforeend', createCards(res.hits));
        htmlElements.btnLoadMore.style.display = 'block';
        stopCounter += 40;
        totalHitsFn(res.totalHits);
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
      console.log(res);
      console.log(stopCounter);
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
