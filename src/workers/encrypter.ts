import { ciphers } from '../algorithms/ciphers';
import type { ICryptoRequest } from '../interfaces/crypto-request';
import type { ICryptoResponse } from '../interfaces/crypto-response';

self.onmessage = (e: MessageEvent<ICryptoRequest>) => {
	console.log('New Request', e.data.id);

	const res = handler(e.data);
	self.postMessage(res);
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
