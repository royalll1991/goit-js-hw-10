import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";

document.addEventListener('DOMContentLoaded', function() {
  const datetimePicker = document.getElementById('datetime-picker');
  const startButton = document.getElementById('start-button');
  const countdownDisplay = document.querySelector('.timer');

  let userSelectedDate;

  flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function(selectedDates) {
      if (selectedDates.length > 0 && selectedDates[0] > new Date()) {
        userSelectedDate = selectedDates[0];
        startButton.removeAttribute('disabled');
      } else {
        startButton.setAttribute('disabled', 'disabled');

        iziToast.show({
          message: 'Please choose a date in the future'
        });
      }
    },
  });

  startButton.addEventListener('click', function() {
    startCountdownTimer();
  });

  function startCountdownTimer() {
    const timerInterval = setInterval(function() {
      const remainingTime = userSelectedDate - new Date();

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        updateCountdownDisplay(0, 0, 0, 0);
        startButton.setAttribute('disabled', 'disabled');
      } else {
        const { days, hours, minutes, seconds } = convertMs(remainingTime);
        updateCountdownDisplay(days, hours, minutes, seconds);
      }
    }, 1000);
  }

  function updateCountdownDisplay(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

  function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
});