const axios = require('axios').default;

export default {
  baseUrl: 'https://pixabay.com/api/',
  key: 'key=23370156-8e4bef2823258510dc0c03035',
  query: '',
  page: 1,

 
  async fetchPictures() {
    console.log(this);
    const response = await axios.get(
      `${this.baseUrl}?${this.key}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=8`
    );

    const pictures = response.data.hits;
    const totalPictures = response.data.totalHits;
    return { pictures, totalPictures };
  },

    incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },



};