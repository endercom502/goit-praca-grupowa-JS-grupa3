import {
  axios,
  BASE_URL,
  API_KEY,
  eventCard,
  getEvents,
} from './search_api.js';

function renderModal(response) {
  const markup = response.data._embedded.events
    .map(({ images, name, dates, _embedded }) => {
      return `
        <li class="event_item">
            <a class="event_item-link href="#">
               <img class="event_item-image" src="${images?.[7].url}" alt="${name}" width="180" height="227" loading="lazy"/>
                  <p class="event_item-name"><b>${name}</b></p>
                  <p class="event_item-date"><b>${dates?.start.localDate}</b></p>
                  <p class="event_item-venue"><b>${_embedded?.venues[0].name}</b></p>
                  <p class="event_item-city"><b>${_embedded?.venues[0].city.name}</b></p>
            </a>
         </li>`;
    })
    .join('');

  eventCard.insertAdjacentHTML('beforeend', markup);
}

// open modal
const openModal = document.querySelector('.event #event_post');
const modalBody = document.querySelector('.modal__backdrop');
const modalClose = document.querySelector('.modal__esc');
const hiden = hiden => {
  modalBody.classList.remove('is-hiddenn');
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
