import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const formField = document.querySelector(`.feedback-form`);

saveForm();

formField.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert('Заполните все поля!');
  }
  const data = { email: email.value, message: message.value };
  console.log(data);
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
});
formField.addEventListener('input', throttle(inputForm, 500));
function inputForm(event) {
  let filterInputs = localStorage.getItem(STORAGE_KEY);
  filterInputs = filterInputs ? JSON.parse(filterInputs) : {};
  filterInputs[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filterInputs));
}
function saveForm() {
  let filterInputs = localStorage.getItem(STORAGE_KEY);

  if (filterInputs) {
    filterInputs = JSON.parse(filterInputs);
    console.log(filterInputs);
    formField.email.value = filterInputs.email;
    // formField.message.value = filterInputs.message;
  }
}
