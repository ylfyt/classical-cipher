interface IResolver {
	[key: string]: (result: string) => void;
}

const resolver: IResolver = {};

let worker: Worker;

const encrypt = (data: string): Promise<string> => {
	return new Promise((resolve) => {
		const id = new Date().getTime();
		resolver[id.toString()] = resolve;
		worker.postMessage({ id, data });
	});
};

export const initAget = () => {
	console.log('Start agent worker');
	worker = new Worker(new URL('../workers/encrypter.ts', import.meta.url), {
		type: 'module',
	});
	worker.onmessage = (e: MessageEvent<{ id: string; result: string }>) => {
		const data = e.data;
		console.log('New Response', data);
		resolver[data.id](data.result);
	};
};

export const cryptoAgent = {
	encrypt,
};
