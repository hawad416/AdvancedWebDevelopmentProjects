'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  console.log(res);
  const data = await res.json();
  console.log(data);
};
whereAmI('Portugal');
console.log('first');

const lotteryPromise = new Promise(function (res, rej) {
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      res('You win!!');
    } else {
      rej(new Error('You lose'));
    }
  });
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

const wait = function (seconds) {
  return new Promise(function (res) {});
};

console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('test end');

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${+(
          data.population / 1000000
        ).toFixed(1)}people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span></span>${data.currencies[0].name} </p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};
const getCountryAndNeighbor = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    renderCountry(data);

    //neighbor
    const [neighbor] = data.borders;

    //ajax call 2
    if (!neighbor) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('portugal');
getCountryAndNeighbor('usa');

const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
console.log(request);

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (res) {
      if (!Response.ok) {
        throw new Error('Country not found');
      }
      return res.json();
    })
    .then(function (data) {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
    });
};

getCountryData('portugal');

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(function (res) {
      if (!res.ok) throw new Error('Problem with geocoding');
      return res.json();
    })
    .then(function (data) {
      console.log(`you are in ${data.city}, ${data.country}`);
    })
    .catch(err => console.error('error'));
};
