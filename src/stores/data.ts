import { writable } from 'svelte/store';

export const contentType = writable<string>('text');
export const fileInput = writable<number[]>([]);
export const dataOutput = writable<number[]>([]);
export const secretKey = writable<string>('');
export const isDecrypt = writable<boolean>(false);
export const strInput = writable<string>('');
export const isFromFile = writable<boolean>(false);

export const resetState = () => {
	contentType.set('text');
	fileInput.set([]);
	dataOutput.set([]);
	strInput.set('');
};
