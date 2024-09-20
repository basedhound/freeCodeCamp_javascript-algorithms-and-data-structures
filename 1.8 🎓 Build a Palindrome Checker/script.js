// Select the elements we need to work with
const userInput = document.getElementById('text-input');
const checkPalindromeBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

// Define the function that checks if a string is a palindrome
const checkForPalindrome = input => {
  // Store the original input for later output
  const originalInput = input;

  // If the input is empty, show an alert and return
  if (input === '') {
    alert('Please input a value');
    return;
  }

  // Remove the previous result
  resultDiv.replaceChildren();

  // Remove non-alphanumeric characters, convert to lowercase, and trim spaces
  const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
  let resultMsg = `<strong>${originalInput}</strong> ${
    lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'
  } a palindrome.`;

  // Create a p-tag for the result message
  const pTag = document.createElement('p');
  pTag.className = 'user-input';
  pTag.innerHTML = resultMsg;
  resultDiv.appendChild(pTag);

  // Show the result and remove the hidden class.
  resultDiv.classList.remove('hidden');
};

// Add event listeners for checking palindromes
checkPalindromeBtn.addEventListener('click', () => {
  checkForPalindrome(userInput.value);
  userInput.value = '';
});

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkForPalindrome(userInput.value);
    userInput.value = '';
  }
});