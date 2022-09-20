import axios from 'axios';
import { options, pagination } from './pagination';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

export const eventCard = document.querySelector('.event #event_post');

export let page = '0';
export let countryCode = '';
export let keyword = '';

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

getEvents(keyword, countryCode, page) // rendeders page at first visit
  .then(function (response) {
    console.log(response.data);

    if (response.data.page.totalElements === 0) {
      console.log('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
    } else {
      renderResults(response);
    }
  })
  .catch(error => console.log(error));

//renderowanie wyników wyszukiwania //

export function renderResults(response) {
  const markup = response.data._embedded.events
    .map(({ images, name, dates, _embedded }) => {
      return `
        <li class="event_item">
            <a class="event_item-link href="#">
               <img class="event_item-image" src="${
                 images?.[8].url
               }" alt="${name}" width="180" height="227" loading="lazy"/>
                  <p class="event_item-name"><b>${name}</b></p>
                  <p class="event_item-date"><b>${
                    dates?.start.localDate
                  }</b></p>
                  <p class="event_item-city"><b>${
                    _embedded?.venues[0].city
                      ? _embedded?.venues[0].city.name
                      : name
                  }</b></p>
            </a>
         </li>`;
    })

    .join('');

  eventCard.insertAdjacentHTML('beforeend', markup);
}

const inputKeyword = document.querySelector('.search-input');
const inputCountry = document.querySelector('.search-select ');

console.log(inputKeyword);

const onSearchFormSubmit = async (event, page) => {
  event.preventDefault();
  page = 0;

  keyword = inputKeyword.value;
  countryCode = inputCountry.value;

  console.log(page);
  eventCard.innerHTML = '';

  try {
    getEvents(keyword, countryCode, page, options, pagination)
      .then(function (response) {
        if (response.data.page.totalElements === 0) {
          alert('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
        } else {
          let totalItemsResponse = response.data.page.totalElements;
          console.log(totalItemsResponse);
          if (totalItemsResponse < 500) {
            // limiting total page amount to render
            totalItems = response.data.page.totalElements;
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
