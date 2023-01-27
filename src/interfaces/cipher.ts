export interface ICipher {
	name: string;
	label: string;
	isMatrixKey: boolean;
	encrypter: (buff: Buffer) => Buffer;
	decrypter: (buff: Buffer) => Buffer;
}
