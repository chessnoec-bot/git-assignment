// productCheck.js
// Prompts for integers until user enters q/Q.
// Echoes the integers.
// Checks whether any two integers multiply to equal a third.
// Includes error handling for non-integer input.

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const numbers = [];

// Returns true if input is an integer like 5, 0, -12
function isIntegerText(text) {
  return /^-?\d+$/.test(text.trim());
}

// Returns {a, b, c} if a*b=c using 3 different entries; otherwise null
function findMatch(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i === j) continue;

      const product = arr[i] * arr[j];

      for (let k = 0; k < arr.length; k++) {
        if (k === i || k === j) continue;

        if (arr[k] === product) {
          return { a: arr[i], b: arr[j], c: arr[k] };
        }
      }
    }
  }
  return null;
}

function ask() {
  rl.question("Enter an integer (or q to quit): ", (input) => {
    const x = input.trim();

    // Quit (q or Q)
    if (x.toLowerCase() === "q") {
      console.log("\nYou entered:");
      if (numbers.length === 0) console.log("(no integers entered)");
      else console.log(numbers.join(", "));

      if (numbers.length < 3) {
        console.log("\nCondition was not met (need at least 3 integers).");
      } else {
        const match = findMatch(numbers);
        if (match) {
          console.log(`\nCondition is met: ${match.a} x ${match.b} = ${match.c}`);
        } else {
          console.log("\nCondition was not met");
        }
      }

      rl.close();
      return;
    }

    // Error handling: must be an integer or q/Q
    if (!isIntegerText(x)) {
      console.log("ERROR: Please enter a valid integer or 'q' to quit.");
      return ask();
    }

    numbers.push(Number(x));
    ask();
  });
}

ask();
