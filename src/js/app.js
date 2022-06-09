import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import search from './search';
import refs from './refs';
import { createMarkup } from './markup-gallery';

let lightbox = new SimpleLightbox('.gallery a');

refs.form.addEventListener('submit', onFormSubmit);
refs.btnMore.addEventListener('click', onBtnMoreClick);

async function onBtnMoreClick() {
  search.incrementPage();
  try {
    const result = await search.fetchPictures();
   uppendMarkup(result.hits);
  } catch (error) {
    console.log(error.message);
  }
}
async function onFormSubmit(e) {
    e.preventDefault();
    search.query = e.currentTarget.elements.searchQuery.value;
       if (search.query === '') {
           Notiflix.Notify.info('please, enter your request');
             clearGallery();
         return;
       }
  
  clearGallery();
  search.resetPage();
  search.incrementPage();
 
     try {
       const result = await search.fetchPictures();
      
    uppendMarkup(result.hits);
    Notiflix.Notify.info(`Hooray! We found ${result.totalHits} images.`);
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
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(arr));
  lightbox.refresh()
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
