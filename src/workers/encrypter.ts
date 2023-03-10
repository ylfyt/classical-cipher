import { ciphers } from '../algorithms/ciphers';
import type { ICryptoRequest } from '../interfaces/crypto-request';
import type { ICryptoResponse } from '../interfaces/crypto-response';

let tmpRequest: ICryptoRequest;

self.onmessage = (e: MessageEvent<ICryptoRequest | Uint8Array>) => {
	if (!(e.data instanceof Uint8Array)) {
		tmpRequest = e.data;
		console.log(`New request ${tmpRequest.id}, waiting for data...`);
		return;
	}
	const req = e.data;
	console.log(`Get data for ${tmpRequest.id} with length : ${req.length}`);
	tmpRequest.data = req;
	const res = handler(tmpRequest);
	tmpRequest = undefined;

	if (!res.success) {
		self.postMessage(res);
		return;
	}

	const data = res.data;
	res.data = new Uint8Array(0);
	self.postMessage(res);
	self.postMessage(data, {
		transfer: [data.buffer],
	});
};

const handler = (req: ICryptoRequest): ICryptoResponse => {
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

	const key = req.key;
	if (!key || key.length === 0)
		return {
			id: req.id,
			success: false,
			message: 'Key is required',
		};

	const data = req.data;
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
