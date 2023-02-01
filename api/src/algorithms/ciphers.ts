import { affineCipherCipherDecrypt, affineCipherCipherEncrypt } from './affine-cipher.js';
import { autoKeyVigenereDecrypt, autoKeyVigenereEncrypt } from './auto-key-vigenere-cipher.js';
import { extendedVigenereCipherDecrypt, extendedVigenereCipherEncrypt } from './extended-vigenere-cipher.js';
import { hillCipherEncrypt } from './hill-cipher.js';
import { vigenereDecrypt, vigenereEncrypt } from './vigener-cipher.js';

export interface ICipher {
	encrypter: (data: Uint8Array, key: string) => number[];
	decrypter: (data: Uint8Array, key: string) => number[];
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
	[
		'affine-cipher',
		{
			encrypter: affineCipherCipherEncrypt,
			decrypter: affineCipherCipherDecrypt,
		},
	],
	[
		'hill-cipher',
		{
			encrypter: hillCipherEncrypt,
			decrypter(data, key) {
				throw new Error('Not implemented yet');
			},
		},
	],
]);
