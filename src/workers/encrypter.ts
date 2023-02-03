import { ciphers } from '../algorithms/ciphers';
import type { ICryptoRequest } from '../interfaces/crypto-request';
import type { ICryptoResponse } from '../interfaces/crypto-response';

let tmpRequest: ICryptoRequest;

self.onmessage = (e: MessageEvent<ICryptoRequest | Uint8Array>) => {
	const req = e.data;
	if (req instanceof Uint8Array) {
		console.log(`Get data for ${tmpRequest.id} with length : ${req.length}`);
		tmpRequest.data = req;
		const res = handler(tmpRequest);
    console.log(4);
		if (!res.success) {
      console.log(5);
			self.postMessage(res);
		} else {
      console.log(6);
			const data = res.data;
			res.data = new Uint8Array(0);
      console.log(7);
			console.log(data);
			console.log(res);
      console.log(8);
			self.postMessage(res);
      console.log(9);
			self.postMessage(data, {
				transfer: [data.buffer],
			});
      console.log(10);
			console.log('====');
			console.log(data);
			console.log(res);
      console.log(11);
		}
		tmpRequest = undefined;
		return;
	}
	tmpRequest = req;
	console.log(req);

	console.log(`New request ${req.id}, waiting for data...`);
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
    console.log(1);
    
		const resolver = action === 'encrypt' ? cipher.encrypter : cipher.decrypter;
    console.log(2);
		const result = resolver(data, key);
    console.log(3);
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
