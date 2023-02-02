import { writable } from 'svelte/store';

export const dataOutput = writable<number[]>([]);
export const secretKey = writable<string>('');
export const isDecrypt = writable<boolean>(false);
export const strInput = writable<string>('');
export const isFromFile = writable<boolean>(false);
export const fileInput = writable<
	| {
			file: File;
			isText: boolean;
	  }
	| undefined
>();

export const resetState = () => {
	dataOutput.set([]);
	strInput.set('');
	fileInput.set(undefined);
};
