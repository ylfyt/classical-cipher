import { hello } from './utils';

console.log('worker');
hello();

const run = (payload: { id: string; data: string }) => {
	const start = new Date().getTime();
	let i = 0;
	while (i < 10_000_000_000) {
		i++;
	}
	const time = new Date().getTime() - start;

	return `${payload.data} | ${time}`;
};

self.onmessage = (e: MessageEvent<{ id: string; data: string }>) => {
	console.log('New Request', e.data);

	const result = run(e.data);
	self.postMessage({ id: e.data.id, result });
};
