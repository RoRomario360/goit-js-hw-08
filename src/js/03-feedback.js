import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formFeedback = document.querySelector('.feedback-form');
formFeedback.addEventListener('input', throttle(onFormData, 500));
formFeedback.addEventListener('submit', onSubmitForm);

const formInputs = {};
initForm();

function onFormData(evt) {
  let formInputs = localStorage.getItem(LOCALSTORAGE_KEY);
  formInputs = formInputs ? JSON.parse(formInputs) : {};
  formInputs[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formInputs));
}

function onSubmitForm(evt) {
  console.log(formInputs);
  evt.preventDefault();
  const email = formFeedback.elements.email.value;
  const message = formFeedback.elements.message.value;
  if (email === '' || message === '') {
    alert('Всі поля повинні бути заповнені');
    return;
  }
  ///

  ///

  formFeedback.reset();
  localStorage.clear();
}

function initForm() {
  let inputFormValues = localStorage.getItem(LOCALSTORAGE_KEY);
  if (inputFormValues) {
    inputFormValues = JSON.parse(inputFormValues);
    console.log(inputFormValues);
    Object.entries(inputFormValues).forEach(([name, value]) => {
      // console.log(name, value);
      // formData[name] = value;
      formFeedback.elements[name].value = value;
    });
  }
}
