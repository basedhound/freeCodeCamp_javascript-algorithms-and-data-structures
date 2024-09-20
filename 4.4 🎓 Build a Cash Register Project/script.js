// Price of the item
let price = 20;

// Cash in drawer, represented as an array of currency types and their amounts
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// DOM elements for displaying change, cash input, and other UI components
const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const priceScreen = document.getElementById('price-screen');
const cashDrawerDisplay = document.getElementById('cash-drawer-display');

// Function to format and display the results of the transaction
const formatResults = (status, change) => {
  // Display the status of the transaction
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`;
  
  // Display each denomination and amount given as change
  change.map(
    money => (displayChangeDue.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)
  );
};

// Function to compute change due and update the UI
const checkCashRegister = () => {
  // Check if the customer has enough money
  if (Number(cash.value) < price) {
    alert('Customer does not have enough money to purchase the item');
    cash.value = ''; // Clear the input field
    return;
  }

  // Check if the amount provided is exactly equal to the price
  if (Number(cash.value) === price) {
    displayChangeDue.innerHTML =
      '<p>No change due - customer paid with exact cash</p>';
    cash.value = ''; // Clear the input field
    return;
  }

  // Calculate the change due
  let changeDue = Number(cash.value) - price;
  let reversedCid = [...cid].reverse(); // Reverse the cash in drawer for easier processing
  let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]; // Denominations in descending order
  let result = { status: 'OPEN', change: [] }; // Initial result object
  let totalCID = parseFloat(
    cid
      .map(total => total[1])
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
  ); // Total cash in drawer

  // Check if there's insufficient funds in the drawer
  if (totalCID < changeDue) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  // Check if the drawer has exactly the amount of change needed
  if (totalCID === changeDue) {
    result.status = 'CLOSED';
  }

  // Compute the change to be given back
  for (let i = 0; i < reversedCid.length; i++) { // Fixed loop condition from <= to < 
    if (changeDue >= denominations[i] && changeDue > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && changeDue >= denominations[i]) {
        total -= denominations[i];
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
        count++;
      }
      if (count > 0) {
        result.change.push([reversedCid[i][0], count * denominations[i]]);
      }
    }
  }
  
  // Check if we were able to give exact change
  if (changeDue > 0) {
    displayChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    return;
  }

  // Format and display the results, and update the UI
  formatResults(result.status, result.change);
  updateUI(result.change);
};

// Function to validate and initiate cash register check
const checkResults = () => {
  if (!cash.value) {
    return; // Do nothing if the cash input is empty
  }
  checkCashRegister();
};

// Function to update the UI based on the current state of the cash register
const updateUI = change => {
  // Map currency denominations to their names for display purposes
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };

  // Update the cash in drawer if change is provided
  if (change) {
    change.forEach(changeArr => {
      const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
      targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
    });
  }

  // Reset the cash input field
  cash.value = '';

  // Update the price display
  priceScreen.textContent = `Total: $${price}`;

  // Update the cash drawer display
  cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

// Event listener for clicking the "Calculate" button
purchaseBtn.addEventListener('click', checkResults);

// Event listener for pressing the Enter key in the cash input field
cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults();
  }
});

// Initialize the UI with the current state
updateUI();
