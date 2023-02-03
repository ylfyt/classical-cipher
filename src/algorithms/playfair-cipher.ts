import { isAlphabet, toLower } from '../utils/ascii.js';
import { dataCleaner } from '../utils/data-cleaner.js';
import { strToBytes } from '../utils/str-to-bytes.js';

/**
 * matrix 5x5
 */
const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;
const j_ASCII_CODE = 106;
const J_ASCII_CODE = 74;
const i_ASCII_CODE = 105;
const I_ASCII_CODE = 73;
const Z_ASCII_CODE = 90;
const z_ASCII_CODE = 122;

const arrayToMatrix = (array: number[]): number[][] => {
	const matrix: number[][] = [];
	let k = 0;

	for (let i = 0; i < 5; i++) {
		const temp: number[] = [];
		for (let j = 0; j < 5; j++) {
			temp.push(array[k]);
			k++;
		}
		matrix.push(temp);
	}

	return matrix;
};

const generateKeyMatrix = (key: number[]) => {
	const keyArray: number[] = [];

	for (let i = 0; i < key.length; i++) {
		if (!keyArray.includes(key[i]) && key[i] != j_ASCII_CODE) keyArray.push(key[i]);
	}

	const alphabet = strToBytes('abcdefghiklmnopqrstuvwxyz');
	for (let i = 0; i < alphabet.length; i++) {
		if (!keyArray.includes(alphabet[i])) keyArray.push(alphabet[i]);
	}

	return arrayToMatrix(keyArray);
};

const generateBigram = (data: Uint8Array) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i] == j_ASCII_CODE) data[i] = i_ASCII_CODE;
	}

	const bigramArray: number[][] = [];

	let i = 0;
	while (i < data.length) {
		if (data[i] === data[i + 1]) {
			bigramArray.push([data[i], z_ASCII_CODE]);
			i++;
			continue;
		}

		if (data[i + 1] != null) bigramArray.push([data[i], data[i + 1]]);
		else bigramArray.push([data[i], z_ASCII_CODE]);
		i += 2;
	}

	return bigramArray;
};

const findElementOnMatrix = (element: number, matrix: number[][]): number[] | undefined => {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (matrix[i][j] == element) return [i, j];
		}
	}
};

export const playfairEncrypt = (data: Uint8Array, keyStr: string): Uint8Array => {
	const cleanKey = dataCleaner(new Uint8Array(strToBytes(keyStr.toLowerCase())));
	data = data.filter((val) => isAlphabet(val));

	const bigramArray = generateBigram(data);
	const keyMatrix = generateKeyMatrix(cleanKey);

	const result: number[] = [];

	for (let i = 0; i < bigramArray.length; i++) {
		let bigram = bigramArray[i];
		bigram = [toLower(bigram[0]), toLower(bigram[1])];

		const xLoc = findElementOnMatrix(bigram[0], keyMatrix)!;
		const yLoc = findElementOnMatrix(bigram[1], keyMatrix)!;

		let tempA: number;
		let tempB: number;

		if (xLoc[0] == yLoc[0]) {
			tempA = keyMatrix[xLoc[0]][(xLoc[1] + 1) % 5];
			tempB = keyMatrix[xLoc[0]][(yLoc[1] + 1) % 5];
		} else if (xLoc[1] == yLoc[1]) {
			tempA = keyMatrix[(xLoc[0] + 1) % 5][xLoc[1]];
			tempB = keyMatrix[(yLoc[0] + 1) % 5][xLoc[1]];
		} else {
			tempA = keyMatrix[xLoc[0]][yLoc[1]];
			tempB = keyMatrix[yLoc[0]][xLoc[1]];
		}

		result.push(tempA);
		result.push(tempB);
	}

	return new Uint8Array(result);
};

export const playfairDecrypt = (data: Uint8Array, keyStr: string): Uint8Array => {
	const cleanKey = dataCleaner(new Uint8Array(strToBytes(keyStr.toLowerCase())));
	data = data.filter((val) => isAlphabet(val));

	const bigramArray = generateBigram(data);
	const keyMatrix = generateKeyMatrix(cleanKey);

	const result: number[] = [];

	for (let i = 0; i < bigramArray.length; i++) {
		let bigram = bigramArray[i];
		bigram = [toLower(bigram[0]), toLower(bigram[1])];

		const xLoc = findElementOnMatrix(bigram[0], keyMatrix)!;
		const yLoc = findElementOnMatrix(bigram[1], keyMatrix)!;

		let tempA: number;
		let tempB: number;

		if (xLoc[0] == yLoc[0]) {
			tempA = keyMatrix[xLoc[0]][(xLoc[1] + 4) % 5];
			tempB = keyMatrix[xLoc[0]][(yLoc[1] + 4) % 5];
		} else if (xLoc[1] == yLoc[1]) {
			tempA = keyMatrix[(xLoc[0] + 4) % 5][xLoc[1]];
			tempB = keyMatrix[(yLoc[0] + 4) % 5][xLoc[1]];
		} else {
			tempA = keyMatrix[xLoc[0]][yLoc[1]];
			tempB = keyMatrix[yLoc[0]][xLoc[1]];
		}

		result.push(tempA);
		result.push(tempB);
	}

	return new Uint8Array(result);
};
