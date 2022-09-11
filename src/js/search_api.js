import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';
let keyword = 'London';
let page = 1;
let countryCode = '';

const searchByName = (keyword, countryCode, page) => {
  const params = {
    apikey: API_KEY,
    keyword: keyword,
    page: page,
  };
  if (countryCode.length) {
    params.countryCode = countryCode;
  }

  return axios.get(`${BASE_URL}`, { params });
};

const eventCard = document.querySelector('#event_post');

searchByName(keyword, countryCode, page).then(function (response) {
  eventCard.innerHTML = response.data._embedded.events;
  console.log(response.data._embedded.events);
});
