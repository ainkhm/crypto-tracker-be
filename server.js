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

	const url = `https://api.coinranking.com/v2/coins?${parameter}=${value}`;
	(async () => {
		try {
			await fetch(`${url}`, {
				headers: {
					'x-access-token': `coinranking2af17fb0b6c75f007ca41c02d47d484ef9e5ed07b6a12e68`,
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
