import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formField = document.querySelector('.feedback-form');

formField.addEventListener('input', throttle(inputForm, 500));
formPopulation();

formField.addEventListener('submit', event => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return alert('Заполните пожалуйста все поля');
  }

  const formData = new FormData(formField);
  formData.forEach((value, name) => console.log(value, name));

  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
});

function inputForm(event) {
  let inputFilter = localStorage.getItem(STORAGE_KEY);
  inputFilter = inputFilter ? JSON.parse(inputFilter) : {};
  inputFilter[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputFilter));
}

function formPopulation() {
  let inputFilter = localStorage.getItem(STORAGE_KEY);
  if (inputFilter) {
    inputFilter = JSON.parse(inputFilter);
    Object.entries(inputFilter).forEach(([name, value]) => {
      formField.elements[name].value = value;
    });
  }
}
