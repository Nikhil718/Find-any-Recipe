export const elements = {
   searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
 const loader = `
 <div class="contain">
  <div class="${elementStrings.loader}"></div>
</div>
 `;
 parent.insertAdjacentHTML('afterbegin' , loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader)
};