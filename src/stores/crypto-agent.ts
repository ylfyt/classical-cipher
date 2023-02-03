import type { ICryptoPayload } from '../interfaces/crypto-payload';
import type { ICryptoResponse } from '../interfaces/crypto-response';

let resolvers: Map<number, (res: ICryptoResponse) => void>;

let worker: Worker;

export const initAget = () => {
	console.log('Start agent worker');
	resolvers = new Map();
	worker = new Worker(new URL('../workers/encrypter.ts', import.meta.url), {
		type: 'module',
	});
	worker.onmessage = (e: MessageEvent<ICryptoResponse>) => {
		const res = e.data;
		console.log('New Response', res.id);
		const resolve = resolvers.get(res.id);
		resolve(res);
		resolvers.delete(res.id);
	};
};

export const run = (payload: ICryptoPayload): Promise<ICryptoResponse> => {
	return new Promise((resolve) => {
		const id = new Date().getTime();
		resolvers.set(id, resolve);
		worker.postMessage({
			...payload,
			id,
		});
	});
};

export const cryptoAgent = {
	run,
};
