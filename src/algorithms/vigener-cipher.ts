import { mod } from '../utils/mod';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

const E = (pj: number, ki: number): number => {
	return mod(pj + ki, 26);
};

const D = (cj: number, ki: number): number => {
	return mod(cj - ki, 26);
};

export const vigenereEncrypt = (data: number[], key: number[]): number[] => {
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((val) => {
		const pj = val - a_ASCII_CODE;
		if (pj > 25 || pj < 0) return;

		const keyIdx = keyCounter % key.length;
		const ki = key[keyIdx] - a_ASCII_CODE;
		if (ki > 25 || ki < 0) return;

		keyCounter++;
		const e = E(pj, ki);
		result.push(e + A_ASCII_CODE);
	});

	return result;
};

export const vigenereDecrypt = (data: number[], key: number[]): number[] => {
	const result: number[] = [];

	let keyCounter = 0;
	data.forEach((val) => {
		const cj = val - A_ASCII_CODE;
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
