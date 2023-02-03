import { ciphers } from '../algorithms/ciphers';

interface IRequest {
	id: string;
	keyStr: string;
	algorithm: string;
	action: 'encrypt' | 'decrypt';
	file: Uint8Array;
}

interface IResponse {
	id: string;
	success: boolean;
	message: string;
	data?: number[];
}

const run = (payload: { id: string; data: string }) => {
	const start = new Date().getTime();
	let i = 0;
	while (i < 10_000_000_000) {
		i++;
	}
	const time = new Date().getTime() - start;

	return `${payload.data} | ${time}`;
};

self.onmessage = (e: MessageEvent<IRequest>) => {
	console.log('New Request', e.data.id);

	const res = handler(e.data);
	self.postMessage(res);
};

const handler = (req: IRequest): IResponse => {
	const action = req.action;
	if (action !== 'encrypt' && action !== 'decrypt')
		return {
			id: req.id,
			success: false,
			message: 'Action should be encrypt or decrypt',
		};

	const alg = req.algorithm;
	const cipher = ciphers.get(alg);
	if (!cipher)
		return {
			id: req.id,
			success: false,
			message: 'Algorithm not found',
		};

	const key = req.keyStr;
	if (!key || key.length === 0)
		return {
			id: req.id,
			success: false,
			message: 'Key is required',
		};

	const data = req.file;
	if (!data || data.length === 0)
		return {
			id: req.id,
			success: false,
			message: 'Data is required',
		};

	try {
		const resolver = action === 'encrypt' ? cipher.encrypter : cipher.decrypter;

		const result = resolver(data, key);
		return {
			id: req.id,
			success: true,
			data: result,
			message: '',
		};
	} catch (error) {
		const err = error as Error;
		return {
			id: req.id,
			success: false,
			message: err.message,
		};
	}
};
