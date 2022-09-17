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
