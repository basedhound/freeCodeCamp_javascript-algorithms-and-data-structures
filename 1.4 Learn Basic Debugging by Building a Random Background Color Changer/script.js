const darkColorsArr = [
  "#2C3E50",
  "#34495E",
  "#2C2C2C",
  "#616A6B",
  "#4A235A",
  "#2F4F4F",
  "#0E4B5A",
  "#36454F",
  "#2C3E50",
  "#800020",
];

function getRandomIndex() {
  const randomIndex = Math.floor(darkColorsArr.length * Math.random());
  return randomIndex;
}

// Selecting the elements after DOM is loaded
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");
const btn = document.querySelector("#btn");

function changeBackgroundColor() {
  const color = darkColorsArr[getRandomIndex()];
  
  bgHexCodeSpanElement.innerText = color; // Update the span's inner text
  body.style.backgroundColor = color; // Change the background color of the body
}

// Assigning the function reference to onclick
btn.onclick = changeBackgroundColor;
