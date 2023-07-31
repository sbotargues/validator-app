import express, { Request, Response } from "express";

const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

// Use Luhn Algorithm to validate token
const isValidToken = (token: string): boolean => {
  // Check that token matches expected format
  const regex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
  if (!regex.test(token)) {
    return false;
  }

  // Remove hyphens from token before validation
  const cleanedToken = token.replace(/-/g, "");

  // Convert the token to an array of numbers
  let numbers = cleanedToken.split("").map((num) => parseInt(num));

  // Implement Luhn Algorithm
  for (let i = numbers.length - 1 - (numbers.length % 2); i >= 0; i -= 2) {
    numbers[i] = numbers[i] * 2;
    if (numbers[i] > 9) {
      numbers[i] = numbers[i] - 9;
    }
  }

  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum % 10 === 0;
};

app.get("/validate/:token", (req: Request, res: Response) => {
  const token = req.params.token;
  const isValid = isValidToken(token);
  res.send({ isValid });
});

app.listen(port, () => {
  console.log(`ValidatorService listening at http://localhost:${port}`);
});
