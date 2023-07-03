const searchContainerElem = document.querySelector('.search-container');
const searchBtnElem = document.querySelector('.search-btn');
const cancelBtnElem = document.querySelector('.cancel-btn');
const searchInputElem = document.querySelector('.search-input');


searchBtnElem.addEventListener('click', () => {
    searchContainerElem.classList.add('activeSearch');
    searchInputElem.classList.add('activeSearch');
    searchBtnElem.classList.add('activeSearch');
    cancelBtnElem.classList.add('activeSearch');
})

cancelBtnElem.addEventListener('click', () => {
    searchContainerElem.classList.remove('activeSearch');
    searchInputElem.classList.remove('activeSearch');
    searchBtnElem.classList.remove('activeSearch');
    cancelBtnElem.classList.remove('activeSearch');
})
