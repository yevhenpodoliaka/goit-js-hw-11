import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import search from './search';
import refs from './refs';
import { createMarkup } from './markup-gallery';
import InfiniteScroll from 'infinite-scroll';

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onFormSubmit);
refs.btnMore.addEventListener('click', onBtnMoreClick);

async function onBtnMoreClick() {
  try {
    const result = await search.fetchPictures();
    uppendMarkup(result.hits);
      search.incrementPage();
      search.remnantTotalQuantity -= 40;

    if (search.remnantTotalQuantity <= 0) {
      return endGalleryList();
    }
  } catch (error) {
   Notify.failure(error.message);
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  search.query = e.currentTarget.elements.searchQuery.value;
  if (search.query === '') {
    Notify.info('please, enter your request');
    clearGallery();
    return;
  }

  clearGallery();
  search.resetPage();


  try {
    const result = await search.fetchPictures();
    if (result.hits.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    uppendMarkup(result.hits);
    search.incrementPage();
    Notify.info(`Hooray! We found ${result.totalHits} images.`);

    refs.btnMore.classList.remove('is-hidden');
    search.remnantTotalQuantity = result.totalHits - 40;
    if (search.remnantTotalQuantity <= 0) {
      return endGalleryList();
    }
  } catch (error) {
    Notify.failure(error.message);
  }
}

function uppendMarkup(arr) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(arr));
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function endGalleryList() {
  Notify.info("We're sorry, but you've reached the end of search results.");
  refs.btnMore.classList.add('is-hidden');
 }

Notify.init({
  width: '300px',
  position: 'left-top',
  closeButton: false,
});
