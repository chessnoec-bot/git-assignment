const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const numbers = [];

function mean(arr) {
  if (arr.length === 0) return null;
  let sum = 0;
  for (const n of arr) sum += n;
  return sum / arr.length;
}

function median(arr) {
  if (arr.length === 0) return null;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function ask() {
  rl.question("Enter an integer (or q to quit): ", (input) => {
    const text = input.trim().toLowerCase();

    if (text === "q") {
      if (numbers.length === 0) {
        console.log("No numbers entered.");
      } else {
        console.log("Numbers:", numbers);
        console.log("Mean:", mean(numbers));
        console.log("Median:", median(numbers));
      }
      rl.close();
      return;
    }

    const num = Number(text);

    if (!Number.isInteger(num)) {
      console.log("Error: enter a whole number like 5 or -2, or q to quit.");
    } else {
      numbers.push(num);
      console.log("Added:", num);
    }

    ask();
  });
}

ask();
