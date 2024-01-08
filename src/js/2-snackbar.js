import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delayInput = this.querySelector('[name="delay"]');
    const stateInput = this.querySelector('[name="state"]:checked');

    if (!delayInput.checkValidity() || !stateInput) {
        iziToast.show({
            message: 'Invalid input. Please fill in all fields.'
          });
      return;
    }

    const delay = parseInt(delayInput.value, 10);
    const state = stateInput.value;

    const notificationPromise = new Promise((resolve, reject) => {
      if (state === 'fulfilled') {
        setTimeout(() => resolve(delay), delay);
      } else {
        setTimeout(() => reject(delay), delay);
      }
    });

    notificationPromise.then(
      (delay) => iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`
      }),
      (delay) => iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`
      }))

      this.reset();
  });