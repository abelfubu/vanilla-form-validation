const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
  setTimeout(() => {
    formControl.className = 'form-control';
  }, 5000);
};

const showSuccess = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, 'Please enter a valid email');
  }
};

const checkInputLength = (input, min, max) => {
  if (input.value.length < min)
    showError(
      input,
      `${getFieldName(input)} must be al least ${min} characters`,
    );
  else if (input.value.length > max)
    showError(
      input,
      `${getFieldName(input)} can't be larger then ${max} characters`,
    );
  else showSuccess(input);
};

const getFieldName = input => input.id[0].toUpperCase() + input.id.slice(1);

const checkEmptyInput = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

//Event listeners
form.addEventListener('submit', event => {
  event.preventDefault();
  checkEmptyInput([username, email, password, password2]);
  checkInputLength(username, 3, 33);
  checkInputLength(password, 6, 20);
  checkInputLength(password2, 6, 20);
  validateEmail(email);
  checkPasswordMatch(password, password2);
});
