import App from './App.svelte';
import { cryptoAgent, initAget } from './stores/worker';

const app = new App({
	target: document.getElementById('app'),
});

export default app;

initAget();
setTimeout(() => {
	const res = cryptoAgent.encrypt('hello, world');
	res.then((result) => {
		console.log(result);
	});
}, 1000);
