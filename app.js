import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/convert', async (req, res) => {
  const fromCurrency = req.query.from;
  const toCurrency = req.query.to;
  const amount = req.query.amount;
  const apiKey = '518a1b41e36ee12aa70eb1351d740dab'; // Replace with your CurrencyAPI API key

  try {
    const url = `https://api.exchangeratesapi.io/v1/latest?apiKey=${apiKey}&base=${fromCurrency}&symbols=${toCurrency}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Unable to fetch exchange rates');
    }

    const data = await response.json();
    if (data.rates && data.rates[toCurrency]) {
      const rate = data.rates[toCurrency];
      const convertedAmount = amount * rate;
      res.send(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    } else {
      res.send('Error: Unable to convert currency');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(5500, () => {
  console.log('Server started on port 5500');
});
