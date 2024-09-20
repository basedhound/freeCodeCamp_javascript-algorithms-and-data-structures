// Get input field and buttons by their respective IDs
const inputField = document.getElementById('user-input');
const verifyBtn = document.getElementById('check-btn');
const resetBtn = document.getElementById('clear-btn');
const outputDiv = document.getElementById('results-div');

// Function to validate the phone number
const validatePhoneNumber = number => {
  // Check if the input is empty and alert the user
  if (number === '') {
    alert('Please provide a phone number');
    return;
  }
  
  // Regex pattern components for valid US phone numbers
  const optionalCountryCode = '^(1\\s?)?'; // Optional '1' country code
  const areaCodePattern = '(\\([0-9]{3}\\)|[0-9]{3})'; // Area code with or without parentheses
  const separatorPattern = '[\\s\\-]?'; // Optional space or hyphen as separator
  const mainNumberPattern = '[0-9]{3}[\\s\\-]?[0-9]{4}$'; // Main 7-digit phone number
  const phonePattern = new RegExp(
    `${optionalCountryCode}${areaCodePattern}${separatorPattern}${mainNumberPattern}` // Full phone number pattern
  );

  // Create a new <p> element for displaying the validation result
  const resultParagraph = document.createElement('p');
  resultParagraph.className = 'results-text'; // Add class for styling
  
  // Test if the phone number matches the regex pattern
  if (phonePattern.test(number)) {
    resultParagraph.style.color = 'green'; // Set text color to green for valid numbers
    resultParagraph.textContent = `Valid US number: ${number}`; // Display success message
  } else {
    resultParagraph.style.color = 'red'; // Set text color to brown for invalid numbers
    resultParagraph.textContent = `Invalid US number: ${number}`; // Display error message
  }
  
  // Append the <p> element to the output div
  outputDiv.appendChild(resultParagraph);
};

// Event listener for the verify button click
verifyBtn.addEventListener('click', () => {
  validatePhoneNumber(inputField.value); // Validate phone number on button click
  inputField.value = ''; // Clear input field after checking
});

// Event listener for pressing the Enter key inside the input field
inputField.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    validatePhoneNumber(inputField.value); // Validate phone number when Enter is pressed
    inputField.value = ''; // Clear input field after checking
  }
});

// Event listener for the reset button click
resetBtn.addEventListener('click', () => {
  outputDiv.textContent = ''; // Clear the output div
});
