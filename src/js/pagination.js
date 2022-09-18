///// PAGINATION
import Pagination from 'tui-pagination';
import {
  page,
  keyword,
  countryCode,
  eventCard,
  getEvents,
  renderResults,
} from './search_api';

let totalItems;

const container = document.getElementById('tui-pagination-container'); // pagination container
const options = {
  // below default value of options
  totalItems: 510,
  itemsPerPage: 20,
  visiblePages: 5,
  page: page + 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="idden tui-page-btn tui-is-disabled tui-{{type}}" hidden>' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination(container, options);

getEvents(keyword, countryCode, page).then(function (response) {
  totalItems = response.data.page.totalElements; //  <--- tutaj jest dostępna wartość
  console.log(totalItems); // OK.
  return totalItems; // ale nie jest dostępna poza funkcją.
});

pagination.on('afterMove', event => {
  // pagination event handler
  let currentPage = event.page;
  eventCard.innerHTML = ''; // clear current search resulst page

  getEvents(keyword, countryCode, currentPage) // render selected page
    .then(function (response) {
      totalPages = response.data.page.totalPages;
      if (response.data.page.totalElements === 0) {
        console.log('No events found. Try different quote'); // !! dodać obsługę wyświetlenia komunikatu gdy brak rezultatów !!
      } else {
        renderResults(response);
      }
    })
    .catch(error => console.log(error));

  console.log(currentPage);
});
