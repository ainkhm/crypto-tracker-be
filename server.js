const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(morgan('coins'));

//routes
app.get('/coins', (req, res) => {
	const parameter = Object.keys(req.query)[0];
	const value = Object.values(req.query)[0];

	const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?${parameter}=${value}`;
	(async () => {
		try {
			await fetch(`${url}`, {
				headers: {
					'X-CMC_PRO_API_KEY': `53719fb9-5835-478a-a93b-d6a399c91a4a`,
				},
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json);
					res.json(json);
				});
		} catch (error) {
			console.log(error);
		}
	})();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on Port, ${port}`);
});
