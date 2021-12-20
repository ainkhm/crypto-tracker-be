const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();

app.use(cors());
app.use(morgan('coins'));

//routes
app.get('/coins', (req, res) => {
	const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000`;
	(async () => {
		try {
			await fetch(`${url}`, {
				headers: {
					'x-access-token': `9d63ba22-7a94-48c3-8e5f-2aebfbda7c1d"`,
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
