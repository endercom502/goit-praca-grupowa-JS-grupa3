import { axios, BASE_URL, API_KEY, _embedded } from './search_api.js';

const modalAPI = document.querySelector('.modal__big-img');
const eventNameToModal = document.querySelector('.event_item-name');
let countryCode = 'pl';
let keyword = '';
export const getEvents1 = (keyword1, countryCode1, page1) => {
  const params1 = {
    apikey: API_KEY,
    countryCode1: countryCode,
    keyword1: keyword,
  };

  const response1 = axios.get(`${BASE_URL}`, { params1 });
  return response1;
};
getEvents(keyword, countryCode, page)
  .then(function (response) {
    if (response.data.page.totalElements === 0) {
      console.log('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
    } else {
      console.log(response.data._embedded.events);
      renderResults(response);
    }
  })
  .catch(error => console.log(error));

//renderowanie wyników wyszukiwania //

// // function renderResults(response1) {
// //   const markup = response1.data._embedded.events
// //     .map(({ images, name, dates, _embedded }) => {
// //       return `
// //         <li class="event_item">
// //             <a class="event_item-link href="#">
// //                <img class="event_item-image" src="${images?.[7].url}" alt="${name}" width="180" height="227" loading="lazy"/>
// //                   <p class="event_item-name"><b>${name}</b></p>
// //                   <p class="event_item-date"><b>${dates?.start.localDate}</b></p>
// //                   <p class="event_item-venue"><b>${_embedded?.venues[0].name}</b></p>
// //                   <p class="event_item-city"><b>${_embedded?.venues[0].city.name}</b></p>
// //             </a>
// //          </li>`;
// //     })
// //     .join('');

// //   eventNameToModal.insertAdjacentHTML('beforeend', markup);
// }

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
