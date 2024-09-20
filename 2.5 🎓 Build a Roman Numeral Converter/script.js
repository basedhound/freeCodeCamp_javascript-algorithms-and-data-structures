// Roman Numeral Conversion Logic
function convertToRoman(num) {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }
  return result;
}

// Event Listener for button click
document.getElementById('convert-btn').addEventListener('click', function () {
  const numberInput = document.getElementById('number').value;
  const output = document.getElementById('output');

  // Validation: Empty input
  if (numberInput === '') {
    output.textContent = 'Please enter a valid number';
    return;
  }

  // Convert the input to a number
  const number = parseInt(numberInput);

  // Validation: Number less than 1
  if (number < 1) {
    output.textContent = 'Please enter a number greater than or equal to 1';
    return;
  }

  // Validation: Number 4000 or greater
  if (number >= 4000) {
    output.textContent = 'Please enter a number less than or equal to 3999';
    return;
  }

  // Conversion to Roman numeral
  const romanNumeral = convertToRoman(number);
  output.textContent = romanNumeral;
});