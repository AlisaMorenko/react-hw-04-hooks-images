function fetchImg(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=21789669-964dbbf22655e629fd0e73135&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error('Ничего не найдено'));
    })
    .then(data => {
      // page = page + 1;
      return data.hits;
    });
}
const api = { fetchImg };
export default api;
