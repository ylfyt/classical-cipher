import App from './App.svelte';
import { initAget } from './stores/crypto-agent';

initAget();

const app = new App({
	target: document.getElementById('app'),
});

export default app;
