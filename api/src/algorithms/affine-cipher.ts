import { mod } from '../utils/mod.js';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

const E = (pj: number, km: number, kb: number): number => {
	return mod(km * pj + kb, 26);
};

const D = (cj: number, mi: number, kb: number): number => {
	return mod(mi * (cj - kb), 26);
};

export const affineCipherCipherEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const keyData = keyStr.split('|');
	if (keyData.length !== 2) throw new Error('Key should be 2 number');
	const keyM = parseInt(keyData[0]);
	const keyB = parseInt(keyData[1]);
	if (!keyM || !keyB) throw new Error('Key is not valid');

	const result: number[] = [];

	data.forEach((val) => {
		const pj = val - a_ASCII_CODE;
		if (pj > 25 || pj < 0) return;

		const e = E(pj, keyM, keyB);
		result.push(e + A_ASCII_CODE);
	});

	return result;
};

const inverse = (a: number, b: number) => {
	a = a % b;
	for (let i = 1; i < b; ++i) {
		if (mod(mod(a, 26) * mod(i, 26), 26) === 1) {
			return i;
		}
	}
	return -1;
};

export const affineCipherCipherDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const keyData = keyStr.split('|');
	if (keyData.length !== 2) throw new Error('Key should be 2 number');
	const keyM = parseInt(keyData[0]);
	const keyB = parseInt(keyData[1]);
	if (!keyM || !keyB) throw new Error('Key is not valid');

	const result: number[] = [];

	const mi = inverse(keyM, 26);
	console.log('inverse', mi);

	data.forEach((val) => {
		const cj = val - A_ASCII_CODE;
		if (cj > 25 || cj < 0) return;

		const d = D(cj, mi, keyB);
		result.push(d + a_ASCII_CODE);
	});

	return result;
};
