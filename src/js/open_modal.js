import { BASE_URL, API_KEY, getEvents } from './search_api.js';
import { axios } from 'axios';
// const modalAPI = document.querySelector('.modal__big-img');
const eventNameToModal = document.querySelector('.modal__container');
let page = 0;
let countryCode = 'pl';
let keyword = '';

getEvents(keyword, countryCode, page)
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
    .map(({ images, name, dates, _embedded }) => {
      return `
      <div class="modal__small-poster"> </div>
      <div class="container__event_card">
        <div class="modal__big-img">
            <img class="modal__img_big" src="${images?.[7].url}">
        </div>
        <div class="modal__text-container">
        <h2 class="modal__h1">INFO</h2>
        <p class="modal__p">Atlas Weekend is the largest music festival in Ukraine.More than 200 artists will create a proper music festival
        atmosphere on 10 stages</p>
        <h2 class="modal__h1">WHEN</h2>
        <p class="modal__p">2021-06-09</p>
        <h2 class="modal__h1">WHERE</h2>
        <p class="modal__p">Kyiv, Ukraine</p>
        <p class="modal__p" style="padding-top: 5px;">VDNH</p>
        <h2 class="modal__h1">WHO</h2>
        <p class="modal__p">The Black Eyed Peas</p>
        <h2 class="modal__h1">PRICES</h2>
        <p class="modal__p">Standart 300-500 UAH</p>
        <button class="modal__button">BUY TICKETS</button>
        <p class="modal__p">VIP 1000-1500 UAH</p>
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
console.log(getEvents1);
console.log(eventNameToModal.firstChild);
