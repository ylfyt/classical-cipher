import { writable } from 'svelte/store';

export const dataInput = writable<IDataInput>({
	contentType: 'text',
	data: '',
});
