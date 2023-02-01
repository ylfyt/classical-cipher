import { toLower } from '../utils/ascii.js';
import { mod } from '../utils/mod.js';
import { strToBytes } from '../utils/str-to-bytes.js';

const a_ASCII_CODE = 97;

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 26);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 26);
};

export const vigenereEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = strToBytes(keyStr.toLowerCase());
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((val) => {
		val = toLower(val);  
		const pj = val - a_ASCII_CODE;
		if (pj > 25 || pj < 0) return;

		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx] - a_ASCII_CODE;
		if (ki > 25 || ki < 0) return;

		keyCounter++;
		const e = E(pj, ki);
		result.push(e + a_ASCII_CODE);
	});

	return result;
};

export const vigenereDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key = strToBytes(keyStr.toLowerCase());
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((val) => {
		val = toLower(val);
		const cj = val - a_ASCII_CODE;
		if (cj > 25 || cj < 0) return;

		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx] - a_ASCII_CODE;
		if (ki > 25 || ki < 0) return;

		keyCounter++;
		const d = D(cj, ki);
		result.push(d + a_ASCII_CODE);
	});

	return result;
};
