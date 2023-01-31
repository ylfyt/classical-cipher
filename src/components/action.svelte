<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { dataOutput, isDecrypt, secretKey, strInput, isFromFile, fileInput } from '../stores/data';
	import { strToUtf16Bytes } from '../utils/str-to-16-bytes';

	const BASE_URL = 'http://localhost:4001';

	let message = '';

	const run = async () => {
		try {
			const formData = new FormData();
			formData.set('key', JSON.stringify(strToUtf16Bytes($secretKey)));
			formData.set('file', $isFromFile ? $fileInput : new Blob([new Uint8Array(strToUtf16Bytes($strInput))]));

			message = 'Loading...';
			const response = await fetch(`${BASE_URL}/${$isDecrypt ? 'decrypt' : 'encrypt'}/${$selectedCipher.label}`, {
				method: 'POST',
				body: formData,
			});
			const result = await response.json();
			message = '';

			console.log(response);

			if (!result?.success) {
				message = result?.message;
				return;
			}

			dataOutput.set(result.data);
		} catch (error) {
			console.log('Error', error);
			message = error.message;
		}
	};
</script>

<div class="flex gap-4 px-4 py-2 border-2 rounded-md items-center">
	<button
		disabled={$secretKey.length === 0 || ($isFromFile ? !$fileInput : $strInput.length === 0)}
		on:click={run}
		class={`disabled:cursor-not-allowed p-2 bg-gray-400 shadow-md rounded-md text-black
      ${$secretKey.length === 0 || ($isFromFile ? !$fileInput : $strInput.length === 0) ? 'opacity-50' : 'hover:bg-gray-500'}
    `}>RUN</button
	>
	<div class="text-xl">
		{message}
	</div>
</div>
