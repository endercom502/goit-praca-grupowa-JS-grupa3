import axios from 'axios';
import { options, pagination } from './pagination';

//REFERENCE
export const eventCard = document.querySelector('#event_post');
const paginationDiv = document.querySelector('.tui-pagination');
const modalBody = document.querySelector('.modal__backdrop');
const eventNameToModal = document.querySelector('.modal__container');
const inputKeyword = document.querySelector('.search-input');
const inputCountry = document.querySelector('.search-select ');
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

export let page = 0;
export let countryCode = 'PL';
export let keyword = '';
let totalItems = '';
////////Get By Events/////

export function getEvents(keyword, countryCode, page) {
  const params = {
    apikey: API_KEY,
    countryCode: countryCode,
    keyword: keyword,
    page: page,
  };
  const response = axios.get(`${BASE_URL}`, { params });
  return response;
}
///////////GET By Id//////
export function getById(eventId) {
  const params = {
    apikey: API_KEY,
    id: eventId,
  };
  const response = axios.get(`${BASE_URL}`, { params });
  return response;
}
/////////GET By AuthorId//////
export function getByAuthorId(atractionId) {
  const params = {
    apikey: API_KEY,
    attractionId: atractionId,
  };
  const response = axios.get(`${BASE_URL}`, { params });
  return response;
}
////////////////////////////////////////////////////////////////////////////////

getEvents(keyword, countryCode, page) // GET EVENTS AT OPENING  ///

  .then(function (response) {
    totalItems = response.data.page.totalElements;
    if (response.data.page.totalElements === 0) {
      alert(
        'Oops! somethings gone wrong. Were working to get it fixed as soon as we can'
      ); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
    } else {
      renderResults(response);
    }
  })
  .catch(error => console.log(error));

//////////////////////////////////////////////////////////////////////////////////////START FUNCTION OPEN MODAL//////
const openModalFunction = event => {
  const eventId = event.target.id;
  getById(eventId).then(response => {
    if (response.data.page.totalElements === 0) {
      alert('UPS Cos poszlo nie tak ...');
    } else {
      modalBody.classList.remove('is-hiddenn');
      renderModalResults(response);
      console.log('Modal Open');
      console.log(response.data._embedded.events[0].name);
      //openMOreFromAuthor
      const moreFromAuthor = document.querySelector('.modal__more-from');
      const openMFA = event => {
        const authorId = event.target.id;
        try {
          getByAuthorId(authorId, options)
            .then(function (response) {
              if (response.data.page.totalElements === 0) {
                alert('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
              } else {
                modalBody.classList.add('is-hiddenn');
                //////////CLEAN
                eventCard.innerHTML = '';
                eventNameToModal.innerHTML = '';
                totalItems = response.data.page.totalElements;
                ///////////////
                options.totalItems = totalItems;
                renderResults(response);
                pagination.reset(totalItems);
                console.log('More events from author');
                console.log(response.data._embedded.events);
                console.log('Modal close - cleaner');
              }
            })
            .catch(error => console.log(error));
        } catch (err) {
          console.log(err);
        }
      };
      moreFromAuthor.addEventListener('click', openMFA);
      //ModalClose
      const modalClose = document.querySelector('.modal__esc');
      const close = close => {
        console.log('Modal close');
        eventNameToModal.innerHTML = '';
        modalBody.classList.add('is-hiddenn');
      };
      modalClose.addEventListener('click', close);
    }
  });
};
//////////////// END OPEN MODAL ///////////////////////////////////////////////////RENDERING///////////
const eventListCard = ({ name, images, dates, _embedded }) => `
 <a class="event_item-link " href="#">
    <img class="event_item-image" " src="${
      images?.[4].url ? images?.[0].url : 'Not Found'
    }" alt="${name}" width="180" height="227" loading="lazy"/>
    <p class="event_item-name" "><b>${name}</b></p>
    <p class="event_item-date" "><b>${dates?.start.localDate}</b></p>
    <p class="event_item-city" "><b>${
      _embedded?.venues[0].city ? _embedded?.venues[0].city.name : name
    }</b></p>
 </a>
 `;
export function renderResults(response) {
  const fragment = document.createDocumentFragment();
  response.data._embedded.events.forEach(event => {
    const li = document.createElement('li');
    li.innerHTML = eventListCard(event);
    fragment.appendChild(li);
    li.className = 'event_item';
    li.id = event.id;
    li.addEventListener('click', openModalFunction);
  });
  eventCard.appendChild(fragment);
}
/////////END RENDERING///////////////////////////////////////////////Search by keyword and search by country////////////

const onSearchFormSubmit = async event => {
  event.preventDefault();
  keyword = inputKeyword.value;
  countryCode = inputCountry.value;
  //////Clear////
  eventCard.innerHTML = '';
  eventNameToModal.innerHTML = '';
  paginationDiv.classList.add('is-hiddenn');

  //////////////

  try {
    getEvents(keyword, countryCode, page, options, pagination)
      .then(function (response) {
        if (response.data.page.totalElements === 0) {
          alert('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
        } else {
          paginationDiv.classList.remove('is-hiddenn');
          let totalItemsResponse = response.data.page.totalElements;
          console.log(totalItemsResponse);
          if (totalItemsResponse < 500) {
            // limiting total page amount to render
            totalItems = totalItemsResponse;
          } else {
            totalItems = 500;
          }
          options.totalItems = totalItems;
          console.log(totalItems);
          pagination.reset(totalItems);
          renderResults(response);
        }
      })
      .catch(error => console.log(error));
  } catch (err) {
    console.log(err);
  }
};
inputKeyword.addEventListener('change', onSearchFormSubmit);
inputCountry.addEventListener('change', onSearchFormSubmit);
///////////////////////End Search ///////////////////////////Render Modal////////////////
function renderModalResults(response) {
  console.log(response.data._embedded.events);
  const markup = response.data._embedded.events
    .map(({ images, name, dates, _embedded, priceRanges, url }) => {
      return `
      <div z-index="300" class="modal__small-poster">
      <img class="modal__small-poster-img" src="${images?.[0].url}">
     </div>
      <div class="container__event_card">
        <div class="modal__big-img">
            <img class="modal__img_big" src="${images?.[4].url}">
        </div>
        <div class="modal__text-container">
        <h2 class="modal__h1">INFO</h2>
        <p class="modal__p">${name}</p>
        <h2 class="modal__h1">WHEN</h2>
        <p class="modal__p">${dates?.start.localDate}</p>
        <h2 class="modal__h1">WHERE</h2>
        <p class="modal__p">${
          _embedded?.venues[0].city ? _embedded?.venues[0].city.name : name
        } ${_embedded.venues?.[0].country.name}</p>
        <h2 class="modal__h1">WHO</h2>
        <p class="modal__p">${_embedded.venues?.[0].name}</p>
        <h2 class="modal__h1">PRICES</h2>
        <p class="modal__p">
               <svg class="modal__svg-barcode" width="24" height="16">
                     <use href=""></use>
               </svg>
         ${priceRanges?.[0].type} ${priceRanges?.[0].min}-${
        priceRanges?.[0].max
      } ${priceRanges?.[0].currency}</p>
        <button class="modal__button">
        <a class="modal__btn-buy" href="${url}" target="_blank">BUY TICKETS
        </a></button>
        <p class="modal__p">
               <svg class="modal__svg-barcode" width="24" height="16">
                        <use href=""></use>
                  </svg>
        ${
          priceRanges?.length > 1
            ? priceRanges?.[1].type
            : 'TICKETS NOT AVAILABLE'
        } ${priceRanges?.length > 1 ? priceRanges?.[1].min : ''}${
        priceRanges?.length > 1 ? priceRanges?.[1].max : ''
      } ${priceRanges?.length > 1 ? priceRanges?.[1].currency : ''}</p>
        <button class="modal__button"><a class="modal__btn-buy" href="${url}" target="_blank">BUY TICKETS
        </a></button>
        <div><button id='${
          _embedded.attractions?.[0].id
        }' class="modal__more-from">MORE FROM THIS AUTHOR</button>
        <button class="modal__esc">X</button></div>
        </div>
      `;
    })
    .join('');
  eventNameToModal.insertAdjacentHTML('beforeend', markup);
}
