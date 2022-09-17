import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

const eventCard = document.querySelector('.event #event_post');

let page = 0;
let countryCode = 'pl';
let keyword = '';

export const getEvents = (keyword, countryCode, page) => {
  const params = {
    apikey: API_KEY,
    countryCode: countryCode,
    keyword: keyword,
    page: page,
  };

  const response = axios.get(`${BASE_URL}`, { params });
  return response;
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

function renderResults(response) {
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