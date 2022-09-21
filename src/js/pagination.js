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

const container = document.getElementById('tui-pagination-container'); // pagination container
export let options = {
  // below default value of options
  totalItems: 0,
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
  },
};

export let pagination;
const init = () => {
  getEvents(keyword, countryCode, page, options).then(function (response) {
    let totalItemsResponse = response.data.page.totalElements;
    console.log('wyniki: ', totalItemsResponse);

    if (totalItemsResponse < 500) {
      totalItems = response.data.page.totalElements;
    } else {
      totalItems = 500;
    }

    options.totalItems = totalItems;
    console.log('options total:', totalItems);

    pagination = new Pagination(container, options);
    pagination.movePageTo(1);

    pagination.on('afterMove', async event => {
      // pagination event handler
      let currentPage = event.page;
      eventCard.innerHTML = ''; // clear current search result page
      const response = await getEvents(keyword, countryCode, currentPage - 1); // render selected page
      await renderResults(response);
    });
  });
};

init();
