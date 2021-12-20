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
	console.log(
		'E',
		parameter,
		value,
		`https://api.coinranking.com/v2/coins?${parameter}=${value}`
	);
	const url = `https://api.coinranking.com/v2/coins?${parameter}=${value}`;
	(async () => {
		try {
			await fetch(`${url}`, {
				headers: {
					'x-access-token': `62f1e07a06mshb58178b98356480p135ff4jsnbcfab5493d0e`,
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
