
const timerEl = document.querySelector('[data-deadline]');
const renderHTML = () => {
  const elements = `
    <span class="card__countdown-number"></span>
    <span class="card__countdown-text"></span>
    <span class="card__countdown-number"></span>
    <span class="card__countdown-text"></span>
    <span class="card__countdown-number"></span>
    <span class="card__countdown-text"></span>
    `;

  timerEl.insertAdjacentHTML('beforeend', elements);
};

renderHTML();

const deadLine = timerEl.dataset.deadline;
const numberElements = timerEl.querySelectorAll('.card__countdown-number');
const titleElements = timerEl.querySelectorAll('.card__countdown-text');


const compareDate = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  console.log(offset);
  const a = (new Date(+deadLine).getTime()) + (offset * 60 * 1000) + (3 * 60 * 60 * 1000);

  return a - Date.now();
  const maxTime = new Date(0);
  maxTime.setHours(14, 59, 59, 0);
  console.log(maxTime);
};

const setText = (element, text) => {
  element.innerText = text;
};


const renderClock = () => {
  const daysElement = numberElements[0];
  const hoursElement = numberElements[1];
  const minutesElement = numberElements[2];

  const daysTitle = titleElements[0];
  const hoursTitle = titleElements[1];
  const minutesTitle = titleElements[2];

  function setFirst(text) {
    setText(daysTitle, text);
  }

  function setSecond(text) {
    setText(hoursTitle, text);
  }

  function setThird(text) {
    setText(minutesTitle, text);
  }

  let isLess = false;

  const date = new Date(compareDate());

  const maxTime = new Date(0);
  maxTime.setHours(23, 59, 59, 0);

  if (date.getTime() < maxTime.getTime()) {
    console.log(date.getTime(), ' ', maxTime.getTime());
    isLess = true;
  }

  // удаление таймера
  if (date.getTime() < 0 || !date) {
    timerEl.remove();
  }

  const days = isLess ? date.getHours() : Math.floor(date.getTime() / 1000 / 60 / 60 / 24);
  const hours = isLess ? date.getMinutes() : date.getHours();
  const minutes = isLess ? date.getSeconds() : date.getMinutes();


  if (days === 1 || (days > 20 && days % 10 == 1)) {
    setFirst(isLess ? 'час' : 'день');
    // daysTitle.innerText = 'день';
  } else if (days > 1 && days < 5 || (days > 20 && days % 10 > 1 && days % 10 < 5)) {
    setFirst(isLess ? 'часа' : 'дня');
    // daysTitle.innerText = 'дня';
  } else {
    setFirst(isLess ? 'часов' : 'дней');
    // daysTitle.innerText = 'дней';
  }

  if (hours == 1 || hours == 21) {
    setSecond(isLess ? 'минута' : 'час');
    // hoursTitle.innerText = 'час';
  } else if (hours > 1 && hours < 5 || (hours > 20 && hours % 10 > 1 && hours % 10 < 5)) {
    setSecond(isLess ? 'минуты' : 'часа');
    // hoursTitle.innerText = 'часа';
  } else {
    setSecond(isLess ? 'минут' : 'часов');
    // hoursTitle.innerText = 'часов';
  }

  if (minutes == 1 || (minutes > 20 && minutes % 10 == 1)) {
    setThird(isLess ? 'секунда' : 'минута');
    // minutesTitle.innerText = 'минута';
  } else if (minutes > 1 && minutes < 5 || (minutes > 20 && minutes % 10 > 1 && minutes % 10 < 5)) {
    setThird(isLess ? 'секунды' : 'минуты');
    // minutesTitle.innerText = 'минуты';
  } else {
    setThird(isLess ? 'секунд' : 'минут');
    // minutesTitle.innerText = 'минут';
  }

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
};

setInterval(() => {
  renderClock();
}, 1000);


