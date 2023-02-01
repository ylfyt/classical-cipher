import { matrix, det, gcd } from 'mathjs';
import { mod } from '../utils/mod.js';

const a_ASCII_CODE = 97;
const A_ASCII_CODE = 65;

function createMatrixKey(size: number, data: number[]): number[][] {
	const matrices: number[][] = [];
	for (var i = 0; i < size; i++) {
		const rows: number[] = [];
		for (var j = 0; j < size; j++) {
			rows.push(data[i * size + j]);
		}
		matrices.push(rows);
	}

	return matrices;
}

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
	// if (gcd(determinant, 26) != 1) throw new Error('Matrix key cannot be inversed');

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
	data.forEach((val) => {
		const pj = val - a_ASCII_CODE;
		if (pj > 25 || pj < 0) return;
		const sectionNum = Math.floor(plainCounter / size);
		const matrixRow = mod(plainCounter, size);
		const sum = matrices[matrixRow].reduce((prev, val, idx) => prev + val * (data[sectionNum * size + idx] - a_ASCII_CODE), 0);
		const e = mod(sum, 26);
		result.push(e + A_ASCII_CODE);
		plainCounter++;
	});

	return result;
};

// function decrypt(text, m, arr) {
// 	m = parseInt(m);
// 	if (m != 2 && m != 3) return 'm should be 2 or 3';

// 	matrices = createMatrixKey(m, arr);
// 	if (!matrices) return 'matrices format incompleted';
// 	det = math.mod(math.det(math.matrix(matrices)), 26);

// 	if (math.gcd(det, 26) != 1) return 'Determinant = ' + det + ' : There is no modular multiplicative inverse for this integer';

// 	n = 1;
// 	while ((det * n) % 26 != 1) {
// 		n++;
// 	}

// 	// inverse matrix
// 	if (m == 2) {
// 		comatrix = [
// 			[matrices[1][1], -1 * matrices[0][1]],
// 			[-1 * matrices[1][0], matrices[0][0]],
// 		];
// 		comatrix = math.mod(comatrix, 26);
// 		matrices = math.mod(math.multiply(n, comatrix), 26);
// 	} else if (m == 3) {
// 		comatrix = [];

// 		for (var i = 0; i < m; i++) {
// 			rows = [];
// 			for (var j = 0; j < m; j++) {
// 				m1 = parseInt(matrices[math.mod(i + 1, m)][math.mod(j + 1, m)] * matrices[math.mod(i + 2, m)][math.mod(j + 2, m)]);
// 				m2 = parseInt(matrices[math.mod(i + 1, m)][math.mod(j + 2, m)] * matrices[math.mod(i + 2, m)][math.mod(j + 1, m)]);

// 				rows.push(m1 - m2);
// 			}
// 			comatrix.push(rows);
// 		}

// 		comatrix = math.transpose(math.mod(comatrix, 26));
// 		matrices = math.mod(math.multiply(n, comatrix), 26);
// 	}

// 	text = text.toUpperCase();
// 	text = text.split(' ').join('');
// 	decryptedText = '';

// 	for (var i = 0; i < text.length - 1; i += m) {
// 		matP = [];
// 		for (var j = i; j < m + i; j++) {
// 			matP.push(parseInt(text.charCodeAt(j) - 65));
// 		}

// 		result = math.transpose(math.mod(math.multiply(matrices, math.transpose([matP])), 26));
// 		for (var k = 0; k < m; k++) {
// 			decryptedText += String.fromCharCode(math.subset(result, math.index(0, k)) + 65);
// 		}
// 	}

// 	// if (decryptedText.substr(decryptedText.length-2) == 'ZZ') decryptedText = decryptedText.substr(0,decryptedText.length-2);
// 	// else if (decryptedText.substr(decryptedText.length-1) == 'Z') decryptedText = decryptedText.substr(0,decryptedText.length-1);

// 	return decryptedText;
// }
