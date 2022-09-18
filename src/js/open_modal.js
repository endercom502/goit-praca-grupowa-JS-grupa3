import { API_KEY, getEvents, BASE_URL } from './search_api.js';
import { axios } from 'axios';
// const idNumber = document.querySelector('.event_item');
const eventNameToModal = document.querySelector('.modal__container');
let page = 0;
let countryCode = 'pl';
let keyword = '';
let id = '';
let size = 1;
let city = '';
// const response = axios.get(`${BASE_URL}${id}`, { params });
// return response;
getEvents(keyword, countryCode, page, id, size, city)
  .then(function (response) {
    if (response.data.page.totalElements === 0) {
      console.log('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
    } else {
      console.log(response.data._embedded.events);
      renderResults1(response);
    }
  })
  .catch(error => console.log(error));

function renderResults1(response) {
  const markup = response.data._embedded.events
    .map(({ images, name, dates, _embedded, description, priceRanges }) => {
      return `
      <div class="modal__small-poster"> </div>
      <div class="container__event_card">
        <div class="modal__big-img">
            <img class="modal__img_big" src="${images?.[7].url}">
        </div>
        <div class="modal__text-container">
        <h2 class="modal__h1">INFO</h2>
        <p class="modal__p">${_embedded.description}</p>
        <h2 class="modal__h1">WHEN</h2>
        <p class="modal__p">${dates?.start.localDate}</p>
        <h2 class="modal__h1">WHERE</h2>
        <p class="modal__p">${_embedded.venues?.[0].city.name}, ${_embedded.venues?.[0].country.name}</p>
        <p class="modal__p" style="padding-top: 5px;">${name}</p>
        <h2 class="modal__h1">WHO</h2>
        <p class="modal__p">${_embedded.venues?.[0].name}</p>
        <h2 class="modal__h1">PRICES</h2>
        <p class="modal__p">${priceRanges?.[0].type} ${priceRanges?.[0].min}-${priceRanges?.[0].max} ${priceRanges?.[0].currency}</p>
        <button class="modal__button">BUY TICKETS</button>
        <p class="modal__p">${priceRanges?.[1].type} ${priceRanges?.[1].min}-${priceRanges?.[1].max} ${priceRanges?.[1].currency}</p>
        <button class="modal__button">BUY TICKETS</button>
        </div>
      `;
    })
    .join('');

  eventNameToModal.insertAdjacentHTML('beforeend', markup);
}

// open modal
const openModal = document.querySelector('.event #event_post');
const modalBody = document.querySelector('.modal__backdrop');
const modalClose = document.querySelector('.modal__esc');
const hiden = hiden => {
  modalBody.classList.remove('is-hiddenn');
  eventNameToModal.firstChild;
};
const close = close => {
  modalBody.classList.add('is-hiddenn');
};

openModal.addEventListener('click', hiden);
modalClose.addEventListener('click', close);
// // const keyCode = document.addEventListener('keyup', event => {
// //   console.log('key: ', event.key);
// // });
// // function closeEsc() {
// //   if (keyCode === Escape) {
// //     console.log(close);
//   }
// }
document.addEventListener('keyup', close);
// console.log(response);
