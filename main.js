const readFileSync = require('fs').readFileSync;

// Check if input code is provided
if (process.argv.length < 3) {
  console.error('Please provide the input code as an argument.');
  process.exit(1);
}

// Get the input code from command line argument
var inputCode = '';
try {
    inputCode = readFileSync(process.argv[2]).toString();
} catch (e) {
    console.error('Error reading the input code file.');
    process.exit(1);
}

// Define the stack
const stack = [];

// Split the input code into individual tokens
const tokens = inputCode.replaceAll("\r","").split('\n');

// Process each token
for (var token of tokens) {
    token = token.replaceAll(/\%.*/g,"");
    token = token.trim();
    if (token === '+') {
        // Addition operation
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a + b);
    } else if (token === '-') {
        // Subtraction operation
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a - b);
    } else if (token === '*') {
        // Multiplication operation
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a * b);
    } else if (token === '/') {
        // Division operation
        const b = stack.pop();
        const a = stack.pop();
        stack.push(a / b);
    } else if (token === '#') {
        process.stdout.write(stack.pop().toString());
    } else if (token === "$") {
        process.stdout.write(String.fromCharCode(stack.pop()))
    } else {
        // Push the token as a number onto the stack
        stack.push(parseFloat(token));
    }
}
