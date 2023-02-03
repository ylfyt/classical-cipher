interface IPayload {
	keyStr: string;
	algorithm: string;
	file: Uint8Array;
}

interface IResponse {
	id: string;
	success: boolean;
	message: string;
	data?: number[];
}

interface IResolver {
	[key: string]: (res: IResponse) => void;
}

const resolver: IResolver = {};

let worker: Worker;

const encrypt = (payload: IPayload): Promise<IResponse> => {
	return new Promise((resolve) => {
		const id = new Date().getTime();
		resolver[id.toString()] = resolve;
		worker.postMessage({
			...payload,
			action: 'encrypt',
			id,
		});
	});
};

const decrypt = (payload: IPayload): Promise<IResponse> => {
	return new Promise((resolve) => {
		const id = new Date().getTime();
		resolver[id.toString()] = resolve;
		worker.postMessage({
			...payload,
			action: 'decrypt',
			id,
		});
	});
};

export const initAget = () => {
	console.log('Start agent worker');
	worker = new Worker(new URL('../workers/encrypter.ts', import.meta.url), {
		type: 'module',
	});
	worker.onmessage = (e: MessageEvent<IResponse>) => {
		const res = e.data;
		console.log('New Response', res.id);
		resolver[res.id](res);
	};
};

export const cryptoAgent = {
	encrypt,
	decrypt,
};
