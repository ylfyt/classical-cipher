import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(4001, () => {
	console.log('Server is listening on port', 4001);
});
