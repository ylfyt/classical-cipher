import { mod } from '../utils/mod.js';
import { strToBytes } from '../utils/str-to-bytes.js';

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 256);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 256);
};

export const extendedVigenereEncrypt = (data: Uint8Array, keyStr: string): Uint8Array => {
	const key = strToBytes(keyStr.toLowerCase());

	let keyCounter = 0;
	for (let i = 0; i < data.length; i++) {
		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx];

		keyCounter++;
		const e = E(data[i], ki);
		data[i] = e;
	}

	return data;
};

export const extendedVigenereDecrypt = (data: Uint8Array, keyStr: string): Uint8Array => {
	const key = strToBytes(keyStr.toLowerCase());

	let keyCounter = 0;
	for (let i = 0; i < data.length; i++) {
		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx];

		keyCounter++;
		const d = D(data[i], ki);
		data[i] = d;
	}

	return data;
};
