import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import search from './search';

search.fetchPictures().then(console.log);
// console.log(object);