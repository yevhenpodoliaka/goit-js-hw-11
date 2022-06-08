import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import search from './search';
import refs from './refs';
import { createMarkup } from './markup-gallery';

const gallery =new SimpleLightbox('.gallery a', {
  disableScroll: true,
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onFormSubmit);
refs.btnMore.addEventListener('click', onBtnMoreClick);

async function onBtnMoreClick() {
  search.incrementPage();
  try {
    const result = await search.fetchPictures();
    const pictures = result.pictures;
    const totalPictures = result.totalPictures;

      uppendMarkup(pictures);
      } catch (error) {
    console.log(error.message);
  }
}
async function onFormSubmit(e) {
  e.preventDefault();
  clearGallery();
  search.resetPage();
  search.incrementPage();
  search.query = e.currentTarget.elements.searchQuery.value;
  try {
    const result = await search.fetchPictures();
    const pictures = result.pictures;
    const totalPictures = result.totalPictures;
    uppendMarkup(pictures);
    Notiflix.Notify.info(`Hooray! We found ${totalPictures} images.`);
  } catch (error) {
    console.log(error.message);
  }
}

function uppendMarkup(arr) {
  if (arr.length === 0) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  refs.gallery.insertAdjacentHTML('afterbegin', createMarkup(arr));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}


