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
	const cleanBytes: number[] = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i] - a_ASCII_CODE;
		if (element >= 0 && element < 26) cleanBytes.push(data[i]);
	}

	cleanBytes.forEach((val, idx) => {
		const keyIdx = idx % key.length;
		const pj = val - a_ASCII_CODE;
		const ki = key[keyIdx] - a_ASCII_CODE;
		if (ki > 25 || ki < 0) return;
		if (pj > 25 || pj < 0) return;

		const e = E(pj, ki);
		result.push(e + A_ASCII_CODE);
	});

	return result;
};

export const vigenereDecrypt = (data: number[], key: number[]): number[] => {
	const result: number[] = [];
	data.forEach((val, idx) => {
		const keyIdx = idx % key.length;
		const cj = val - A_ASCII_CODE;
		const ki = key[keyIdx] - a_ASCII_CODE;
		const d = D(cj, ki);
		result.push(d + a_ASCII_CODE);
	});

	return result;
};
