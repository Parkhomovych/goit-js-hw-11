import Notiflix from 'notiflix';
const htmlElements = {
  form: document.querySelector('.search-form'),
  div: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.voltage-button'),
  sorry: document.querySelector('.sorry'),
};

function error(err) {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function goodSearch(total) {
  Notiflix.Notify.success(`Hooray! We found ${total} images.`);
}

function createCards(arr) {
    return arr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
      <img class='img-card' src="${webformatURL}" alt="${tags}" loading="lazy" width='300px' height='200px'/>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`;
        }
      )
      .join('');
  }
export { htmlElements, error, goodSearch, createCards };
