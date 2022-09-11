import axios from "axios";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events";
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

const searchByName = (keyword, countryCode,page) =>{
   const params = {
      apikey: API_KEY,
      keyword:keyword,
      countryCode: countryCode,
      page:page,
    };

   return axios.get(`${BASE_URL}`,{params});
};

const eventCard = document.querySelector('#event_post')

searchByName ('london','UK')
.then(function (response) {
   eventCard.innerHTML = response.data._embedded.events
   console.log(response.data._embedded.events)
})
