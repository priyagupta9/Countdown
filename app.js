"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let curDate = new Date();
let curYear = curDate.getFullYear();
let curMonth = curDate.getMonth();
let curDay = curDate.getDate();

const futureDate = new Date(curYear, curMonth, curDay + 10, 20, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const date = futureDate.getDate();
let month = futureDate.getMonth();
month = months[month];
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${mins}am`;

//futuretime in ms
const futureTime = futureDate.getTime();

const remainingTime = () => {
  const currentTime = new Date().getTime();
  let t = futureTime - currentTime;

  // units
  // 1s = 1000ms
  //1m = 60s
  // 1hr = 60 min
  // 1day = 24 hour

  // conversion to ms
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  // remaining tym in ms
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let mins = Math.floor((t % oneHour) / oneMin);
  let secs = Math.floor((t % oneMin) / 1000);

  const values = [days, hours, mins, secs];
  // let i = 0;
  // for (let item of items) {
  //   item.textContent = values[i];
  //   i++;
  // }

  const format = (item) => {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  };
  items.forEach((item, index) => {
    item.textContent = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
  }
};

let countdown = setInterval(remainingTime, 1000);

remainingTime();
