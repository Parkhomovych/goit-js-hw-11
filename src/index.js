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
async function createSearch(search) {
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
  try {
    const repons = await axios.get(`${BASE_URL}${searchParams}`);
    if (repons.data.totalHits === 0) {
      throw error;
    }
    return repons.data;
  } catch (err) {
    error();
  }
}

htmlElements.form.addEventListener('submit', searchFn);
htmlElements.btnLoadMore.addEventListener('click', loadMoreFn);

async function searchFn(evt) {
  evt.preventDefault();
  returnStartValue();
  searchValue = evt.target.searchQuery.value;

  try {
    const respons = await createSearch(searchValue);
    if (respons) {
      htmlElements.div.insertAdjacentHTML(
        'beforeend',
        createCards(respons.hits)
      );
      stopCounter += 40;
      goodSearch(respons.totalHits);
      if (respons.totalHits >= stopCounter) {
        htmlElements.btnLoadMore.style.display = 'block';
        return;
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function loadMoreFn() {
  stopCounter += 40;
  try {
    const respons = await createSearch(searchValue);
    if (!respons) {
      throw error;
    }
    if (respons.totalHits <= stopCounter) {
      htmlElements.sorry.style.display = 'inline-block';
      htmlElements.btnLoadMore.style.display = 'none';
    }
    htmlElements.div.insertAdjacentHTML('beforeend', createCards(respons.hits));
  } catch (err) {
    console.log(err);
  }
}
