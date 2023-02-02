import { toLower } from '../utils/ascii.js';
import { mod } from '../utils/mod.js';
import { gcd } from 'mathjs';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

const E = (pj: number, km: number, kb: number): number => {
	return mod(km * pj + kb, 26);
};

const D = (cj: number, mi: number, kb: number): number => {
	return mod(mi * (cj - kb), 26);
};

export const affineEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const keyData = keyStr.split('|');
	if (keyData.length !== 2) throw new Error('Key should be 2 number');
	const keyM = parseInt(keyData[0]);
	const keyB = parseInt(keyData[1]);
	if (Number.isNaN(keyM) || Number.isNaN(keyB)) throw new Error('Key is not valid');

	if (gcd(keyM, 26) !== 1) throw new Error('Key M should be a relative prime with a value of 26');

	const result: number[] = [];

	data.forEach((val) => {
		val = toLower(val);
		const pj = val - a_ASCII_CODE;
		if (pj > 25 || pj < 0) return;

		const e = E(pj, keyM, keyB);
		result.push(e + a_ASCII_CODE);
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

export const affineDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const keyData = keyStr.split('|');
	if (keyData.length !== 2) throw new Error('Key should be 2 number');
	const keyM = parseInt(keyData[0]);
	const keyB = parseInt(keyData[1]);
	if (!keyM || !keyB) throw new Error('Key is not valid');

	if (gcd(keyM, 26) !== 1) throw new Error('Key M should be a relative prime with a value of 26');

	const result: number[] = [];

	const mi = inverse(keyM, 26);

	data.forEach((val) => {
		val = toLower(val);
		const cj = val - a_ASCII_CODE;
		if (cj > 25 || cj < 0) return;

		const d = D(cj, mi, keyB);
		result.push(d + a_ASCII_CODE);
	});

	return result;
};
