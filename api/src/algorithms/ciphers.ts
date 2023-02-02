import { affineCipherCipherDecrypt, affineCipherCipherEncrypt } from './affine-cipher.js';
import { autoKeyVigenereDecrypt, autoKeyVigenereEncrypt } from './auto-key-vigenere-cipher.js';
import { enigmaDecrypt, enigmaEncrypt } from './enigma-cipher.js';
import { extendedVigenereCipherDecrypt, extendedVigenereCipherEncrypt } from './extended-vigenere-cipher.js';
import { hillCipherDecrypt, hillCipherEncrypt } from './hill-cipher.js';
import { playfairCipherDecrypt, playfairCipherEncrypt } from './playfair-cipher.js';
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
			decrypter: hillCipherDecrypt,
		},
	],
	[
		'playfair-cipher',
		{
			encrypter: playfairCipherEncrypt,
			decrypter: playfairCipherDecrypt,
		},
	],
	[
		'enigma-cipher',
		{
			encrypter: enigmaEncrypt,
			decrypter: enigmaDecrypt,
		},
	],
]);
