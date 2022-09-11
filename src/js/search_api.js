import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';
let keyword = 'rage';
let page = 0;
let countryCode = 'PL';

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

const eventCard = document.querySelector('#event_post');

getEvents(keyword, countryCode, page).then(function (response) {
  if (response.data.page.totalElements === 0) {
    console.log('No events found. Try different quote');
  } else {
    console.log(response.data._embedded.events);
    renderResults(response);
  }
});

function renderResults(response) {
  const markup = response.data._embedded.events.map(({ name, dates }) => {
    console.log(name, dates);
  });
}
