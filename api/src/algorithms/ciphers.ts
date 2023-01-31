import { autoKeyVigenereDecrypt, autoKeyVigenereEncrypt } from './auto-key-vigenere-cipher.js';
import { extendedVigenereCipherDecrypt, extendedVigenereCipherEncrypt } from './extended-vigenere-cipher.js';
import { vigenereDecrypt, vigenereEncrypt } from './vigener-cipher.js';

export interface ICipher {
	encrypter: (data: number[], key: number[]) => number[];
	decrypter: (data: number[], key: number[]) => number[];
}

export const ciphers = new Map<string, ICipher>([
	[
		'extended-vigenere-cipher',
		{
			encrypter: extendedVigenereCipherEncrypt,
			decrypter: extendedVigenereCipherDecrypt,
		},
	],
	[
		'auto-key-vigenere-cipher',
		{
			encrypter: autoKeyVigenereEncrypt,
			decrypter: autoKeyVigenereDecrypt,
		},
	],
	[
		'vigenere-cipher',
		{
			encrypter: vigenereEncrypt,
			decrypter: vigenereDecrypt,
		},
	],
]);