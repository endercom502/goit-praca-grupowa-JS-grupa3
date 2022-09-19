import axios from 'axios';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
const API_KEY = 'zgJDbIZVlwZnbWttdYxA1sycG5ZV7RfO';

export const eventCard = document.querySelector('.event #event_post');

export let page = 0;

export let countryCode = 'PL';
export let keyword = '';
let totalItems = '';

export function getEvents(keyword, countryCode, page) {
  const params = {
    apikey: API_KEY,
    countryCode: countryCode,
    keyword: keyword,
    page: page,
    id: id,
    size: size,
    description: description,
    locale: locale,
  };

  const response = axios.get(`${BASE_URL}`, { params });
  return response;
}

getEvents(keyword, countryCode, page, id, size, description, locale)
  .then(function (response) {
    totalItems = response.data.page.totalElements;
    // console.log(totalItems);
    if (response.data.page.totalElements === 0) {
      console.log('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
    } else {
      renderResults(response);
      return totalItems;
    }
  })
  .catch(error => console.log(error));

//renderowanie wyników wyszukiwania //

export function renderResults(response) {
  const markup = response.data._embedded.events
    .map(({ images, name, dates, _embedded, id }) => {
      return `
        <li class="event_item" id="${id}">
            <a class="event_item-link href="#">
               <img class="event_item-image" src="${images?.[7].url}" alt="${name}" width="180" height="227" loading="lazy"/>
                  <p class="event_item-name" event-id='${id}'><b>${name}</b></p>
                  <p class="event_item-date"><b>${dates?.start.localDate}</b></p>
                  <p class="event_item-venue"><b>${_embedded?.venues[0].name}</b></p>
                  <p class="event_item-city"><b>${_embedded?.venues[0].city ?_embedded?.venues[0].city.name:name}</b></p>
                  <button class="more-from-author" value='${name}'>More</button>
            </a>
         </li>`;
    })
    .join('');

  eventCard.insertAdjacentHTML('beforeend', markup);
}


//Search by keyword and search by country

const inputKeyword = document.querySelector('.search-input');
const inputCountry = document.querySelector('.search-select ');


const onSearchFormSubmit = async event => {
  event.preventDefault();

   const query = inputKeyword.value;
   const country = inputCountry.value;


   
 eventCard.innerHTML = '';
   try {
       getEvents(query,country)
      .then  (function (response) {
         if (response.data.page.totalElements === 0) {
           alert('No events found. Try different quote'); // dodać obsługę wyświetlenia komunikatu gdy brak rezultatów
         } else {
     
           renderResults(response);
         }
       })
        .catch(error => console.log(error));
   

   } catch (err) {
     console.log(err);
   }
 };
 

 inputKeyword.addEventListener('change',onSearchFormSubmit)
 inputCountry.addEventListener('change',onSearchFormSubmit)

// Search from Button search more from author
const btnMore = document.querySelector('.more-from-author');
const eventName = document.querySelector('.event_item-name');



//const onSearchFromAuthor = async event =>{
//   console.log('Hi ')
//   event.preventDefault();

//   const evName = btnMore.value;

//   console.log(evName)

//   eventCard.innerHTML = '';
//      try{
//         getEvents(evName)
//         .then (function(response){
//            if(response.data.page.totalElements ===0){
//               alert('No events found');
//            }else{
//               renderResults(response);
//               console.log(response.data._embedded.events)
//            }
//         })
//      }
//}

//btnMore.addEventListener('click',testFunction);

// function testFunction(){
//console.log ('hi');
//}


const id = ""

export const getById = (id)=>{
   const params = {
      apikey:API_KEY,
      id:id,
   };
   const response = axios.get(`${BASE_URL}`,{params},'Z7r9jZ1Ad8Oeb')
}
getById('Z7r9jZ1Ad8Oeb')
   .then (function(response){
      console.log(response.data._embedded.events)
   })