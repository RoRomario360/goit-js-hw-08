import throttle from 'lodash.throttle';
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formFeedback = document.querySelector('.feedback-form');
formFeedback.addEventListener('input', onFormData);
formFeedback.addEventListener('submit', onSubmitForm);

const formData = {};
initForm();

function onFormData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(evt) {
  console.log(formData);
  evt.preventDefault();
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
      formData[name] = value;
      formFeedback.elements[name].value = value;
    });
  }
}
