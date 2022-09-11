import axios from "axios";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events";
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

const searchByName = (keyword, countryCode) =>{
   const params = {
      apikey: API_KEY,
      keyword:keyword,
      countryCode: countryCode,
    };

   return axios.get(`${BASE_URL}`,{params});
};

const eventCard = document.querySelector('#event_post')

searchByName ('')
.then(function (response) {
   eventCard.innerHTML = response.data.map(function (event) {
     return (
       '<li class="row">' +
         '<img src="https://avatars.githubusercontent.com/u/' + event.data._embedded.events.name + '?s=50" class="col-md-1"/>' +
         '<div class="col-md-3">' +
           '<strong>' + person.name + '</strong>' +
           '<div>Github: <a href="https://github.com/' + person.github + '" target="_blank">' + person.github + '</a></div>' +
           '<div>Twitter: <a href="https://twitter.com/' + person.twitter + '" target="_blank">' + person.twitter + '</a></div>' +
         '</div>' +
       '</li><br/>'
     );
   }).join('');
 })
 .catch(function (err) {
   eventCard.innerHTML = '<li class="text-danger">' + err.message + '</li>';
 });