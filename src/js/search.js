const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = 'key=23370156-8e4bef2823258510dc0c03035';

export default {
  query: '',
  page: 1,

   async fetchPictures() {
    const response = await axios.get(
      `${BASE_URL}?${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=4`
     );
     
     const { data } = response;
     
     return data
  },

    incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },



};