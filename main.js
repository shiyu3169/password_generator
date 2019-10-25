// Dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const eyeEl = document.getElementById('eye');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Generate event listener
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.value = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Show password
eyeEl.addEventListener('click', () => {
  const eyeIcon = eyeEl.children[0];

  if (eyeIcon.classList.contains('fa-eye')) {
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
    resultEl.type = 'text';
  } else {
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
    resultEl.type = 'password';
  }
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.value;

  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');
});

// Generate password() {
function generatePassword(lower, upper, number, symbol, length) {
  // Init password
  let generatedPassword = '';
  // Filter out unchecked types
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    type => Object.values(type)[0]
  );
  // Loop over length
  if (typesCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typesCount) {
    // call generate function for each type
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunc[funcName]();
    });
  }
  // Return final password
  return generatedPassword.slice(0, length);
}

// Generator functions

// Generate random number from 1 to 26
function getRandomHelper() {
  return Math.floor(Math.random() * 26);
}

function getRandomLower() {
  return String.fromCharCode(getRandomHelper() + 97);
}

function getRandomUpper() {
  return String.fromCharCode(getRandomHelper() + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function getRandomSymbol() {
  const safeSymbols = '!@#$%^&*(){}[]=<>/,.';
  return safeSymbols[Math.floor(Math.random() * safeSymbols.length)];
}
