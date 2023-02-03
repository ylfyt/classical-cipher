import type { ICryptoPayload } from '../interfaces/crypto-payload';
import type { ICryptoResponse } from '../interfaces/crypto-response';

let resolvers: Map<number, (res: ICryptoResponse) => void>;
let worker: Worker;
let tmpResponse: ICryptoResponse;

export const initAget = () => {
	console.log('Start agent worker');
	resolvers = new Map();
	worker = new Worker(new URL('../workers/encrypter.ts', import.meta.url), {
		type: 'module',
	});
	worker.onmessage = (e: MessageEvent<ICryptoResponse | Uint8Array>) => {
		const res = e.data;
		if (res instanceof Uint8Array) {
			console.log(`Get response data for ${tmpResponse.id} with length: ${res.length}`);
			tmpResponse.data = res;
			const resolve = resolvers.get(tmpResponse.id);
			resolve(tmpResponse);
			resolvers.delete(tmpResponse.id);
			tmpResponse = undefined;
			return;
		}
		if (res.success) {
			tmpResponse = res;
			console.log(`New response ${res.id}, waiting for data...`);
			return;
		}

		console.log(`Get response ${res.id}`);
		const resolve = resolvers.get(res.id);
		resolve(res);
		resolvers.delete(res.id);
	};
};

export const run = (payload: ICryptoPayload): Promise<ICryptoResponse> => {
	return new Promise((resolve) => {
		const id = new Date().getTime();
		resolvers.set(id, resolve);

		const data = payload.data;
		// Send request information
		worker.postMessage({
			...payload,
			id,
		});
		// Send request data
		worker.postMessage(data, [data.buffer]);
	});
};

export const cryptoAgent = {
	run,
};
