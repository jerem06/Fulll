/**
 * FizzBuzz implementation
 * @param {number} n - The upper limit of numbers to process
 * @returns {void} - Logs results to console
 */
function fizzBuzz(n) {
  if (typeof n !== "number" || n < 1) {
    throw new Error("Input must be a positive number");
  }

  for (let i = 1; i <= n; i++) {
    let result = "";
    if (i % 3 === 0) result += "Fizz";
    if (i % 5 === 0) result += "Buzz";
    console.log(result || i);
  }
}

// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(`Running FizzBuzz for numbers 1 to ${randomNumber}:`);
fizzBuzz(randomNumber);
