// stats.js
// This program reads integers from the user, stores them in an array,
// calculates the mean (average) and median, and prints the results.
// The user can enter "q" to stop entering numbers.

const readline = require("readline");

// Create the readline interface to read input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Array to store all valid integers entered by the user
let numbers = [];

// Function to calculate the mean (average)
function calculateMean(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum / arr.length;
}

// Function to calculate the median
function calculateMedian(arr) {
  // Create a copy of the array and sort it
  let sorted = [...arr].sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);

  // If the array length is even, average the two middle values
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } 
  // If the array length is odd, return the middle value
  else {
    return sorted[mid];
  }
}

// Function to repeatedly ask the user for input
function askForNumber() {
  rl.question("Enter an integer (or q to quit): ", (input) => {

    // Check if the user wants to quit
    if (input.toLowerCase() === "q") {

      // If no numbers were entered, display a message and exit
      if (numbers.length === 0) {
        console.log("No numbers were entered.");
      } else {
        // Calculate and display results
        console.log("Numbers:", numbers);
        console.log("Mean:", calculateMean(numbers));
        console.log("Median:", calculateMedian(numbers));
      }

      // Close the readline interface
      rl.close();
      return;
    }

    // Convert input to a number
    let num = Number(input);

    // Validate that the input is an integer
    if (!Number.isInteger(num)) {
      console.log("Invalid input. Please enter an integer.");
    } else {
      // Store valid integer in the array
      numbers.push(num);
      console.log("Added:", num);
    }

    // Ask for another number
    askForNumber();
  });
}

// Start the program
askForNumber();
