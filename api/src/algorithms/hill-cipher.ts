import { matrix, det, gcd, mod as mathMod, transpose } from 'mathjs';
import { mod } from '../utils/mod.js';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

function createMatrixKey(size: number, data: number[]): number[][] {
	const matrices: number[][] = [];
	for (let i = 0; i < size; i++) {
		const rows: number[] = [];
		for (let j = 0; j < size; j++) {
			rows.push(data[i * size + j]);
		}
		matrices.push(rows);
	}

	return matrices;
}

const inverse = (mat: number[][], size: number): number[][] | undefined => {
	if (size !== 2 && size !== 3) return;

	const determinant = mod(det(matrix(mat)), 26);
	if (gcd(determinant, 26) != 1) return;

	let factor = 1;
	while ((determinant * factor) % 26 != 1) {
		factor++;
	}

	// inverse matrix
	if (size == 2) {
		let comatrix = [
			[mat[1][1], -1 * mat[0][1]],
			[-1 * mat[1][0], mat[0][0]],
		];
		comatrix = mathMod(comatrix, 26);
		for (let i = 0; i < comatrix.length; i++) {
			for (let j = 0; j < comatrix[i].length; j++) {
				comatrix[i][j] *= factor;
			}
		}
		return mathMod(comatrix, 26);
	}

	let comatrix: number[][] = [];

	for (let i = 0; i < size; i++) {
		const rows = [];
		for (let j = 0; j < size; j++) {
			const x1 = mat[mod(i + 1, size)][mod(j + 1, size)] * mat[mod(i + 2, size)][mod(j + 2, size)];
			const x2 = mat[mod(i + 1, size)][mod(j + 2, size)] * mat[mod(i + 2, size)][mod(j + 1, size)];

			rows.push(x1 - x2);
		}
		comatrix.push(rows);
	}

	comatrix = transpose(mathMod(comatrix, 26));
	for (let i = 0; i < comatrix.length; i++) {
		for (let j = 0; j < comatrix[i].length; j++) {
			comatrix[i][j] *= factor;
		}
	}
	return mathMod(comatrix, 26);
};

export const hillCipherEncrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key: number[] = [];
	keyStr.split('|').forEach((val) => {
		const num = parseInt(val);
		if (Number.isNaN(num)) return;
		key.push(num);
	});
	// TODO: Check only can 2x2 or 3x3?
	const size = Math.sqrt(key.length);
	if (key.length === 0) throw new Error('Key should be > 0');
	if (size * size !== key.length) throw new Error('Key size is not valid');

	const matrices = createMatrixKey(size, key);

	const determinant = mod(det(matrix(matrices)), 26);
	// check can be inversed or not
	if (gcd(determinant, 26) != 1) throw new Error('Matrix key cannot be inversed');

	data = data.filter((val) => val - a_ASCII_CODE >= 0 && val - a_ASCII_CODE < 26);

	if (mod(data.length, size) !== 0) {
		const temp = [];
		for (let i = 0; i < size - mod(data.length, size); i++) {
			temp.push('z'.charCodeAt(0));
		}
		data = new Uint8Array([...data, ...temp]);
	}

	const result: number[] = [];

	let plainCounter = 0;
	data.forEach(() => {
		const sectionNum = Math.floor(plainCounter / size);
		const matrixRow = mod(plainCounter, size);
		const sum = matrices[matrixRow].reduce((prev, val, idx) => prev + val * (data[sectionNum * size + idx] - a_ASCII_CODE), 0);
		const e = mod(sum, 26);
		result.push(e + A_ASCII_CODE);
		plainCounter++;
	});

	return result;
};

export const hillCipherDecrypt = (data: Uint8Array, keyStr: string): number[] => {
	const key: number[] = [];
	keyStr.split('|').forEach((val) => {
		const num = parseInt(val);
		if (Number.isNaN(num)) return;
		key.push(num);
	});
	// TODO: Check only can 2x2 or 3x3?
	const size = Math.sqrt(key.length);
	if (key.length === 0) throw new Error('Key should be > 0');
	if (size * size !== key.length) throw new Error('Key size is not valid');

	const mat = createMatrixKey(size, key);
	const inversedMatrix = inverse(mat, size);
	if (!inversedMatrix) throw new Error('Matrix key cannot be inversed');

	console.log(inversedMatrix);

	data = data.filter((val) => val - A_ASCII_CODE >= 0 && val - A_ASCII_CODE < 26);
	if (mod(data.length, size) !== 0) {
		const temp = [];
		for (let i = 0; i < size - mod(data.length, size); i++) {
			temp.push('Z'.charCodeAt(0));
		}
		data = new Uint8Array([...data, ...temp]);
	}

	const result: number[] = [];

	let plainCounter = 0;
	data.forEach(() => {
		const sectionNum = Math.floor(plainCounter / size);
		const matrixRow = mod(plainCounter, size);
		const sum = inversedMatrix[matrixRow].reduce((prev, val, idx) => prev + val * (data[sectionNum * size + idx] - A_ASCII_CODE), 0);
		const e = mod(sum, 26);
		result.push(e + a_ASCII_CODE);
		plainCounter++;
	});

	return result;
};
