
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

  function convert(num,oneForm,divideForm, multiplyForm) {
    if (num === 1 || (num > 20 && num % 10 == 1)) {
      return oneForm;
    } else if (num > 1 && num < 5 || (num > 20 && num % 10 > 1 && num % 10 < 5)) {
      return divideForm;
    } else {
      return multiplyForm;
    }
  }

  setFirst(isLess ? convert(days, "час", 'часа', 'часов') : convert(days, 'день', 'дня', 'дней'));

  setSecond(isLess ? convert(hours, "минута", 'минуты', 'минут') : convert(hours, 'час', 'часа', 'часов'));

  setThird(isLess ? convert(minutes, "секунда", 'секунды', 'секунд') : convert(minutes, 'минута', 'минуты', 'минут'));
 

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
};

setInterval(() => {
  renderClock();
}, 1000);


