<script lang="ts">
	import type { ICryptoPayload } from '../interfaces/crypto-payload';
	import { selectedCipher } from '../stores/ciphers';
	import { cryptoAgent } from '../stores/crypto-agent';
	import { dataOutput, isDecrypt, secretKey, strInput, isFromFile, fileInput } from '../stores/data';
	import { strToBytes } from '../utils/str-to-bytes';

	let message = '';

	const run = async () => {
		try {
			let data: Uint8Array;

			if ($isFromFile) {
				const buff = await $fileInput.file.arrayBuffer();
				data = new Uint8Array(buff);
			} else {
				data = new Uint8Array(strToBytes($strInput));
			}

			const payload: ICryptoPayload = {
				algorithm: $selectedCipher.label,
				data,
				key: $secretKey,
				action: $isDecrypt ? 'decrypt' : 'encrypt',
			};

			message = 'Loading...';
			const response = await cryptoAgent.run(payload);
			message = '';

			if (!response?.success) {
				message = response.message;
				return;
			}

			dataOutput.set(response.data);
		} catch (error) {
			console.log('Error', error);
			message = error.message;
		}
	};
</script>

<div class="flex gap-4 px-4 py-2 border-2 rounded-md items-center">
	<button
		disabled={$secretKey.length === 0 || ($isFromFile ? !$fileInput?.file : $strInput.length === 0)}
		on:click={run}
		class={`disabled:cursor-not-allowed p-2 bg-gray-400 shadow-md rounded-md text-black
      ${$secretKey.length === 0 || ($isFromFile ? !$fileInput?.file : $strInput.length === 0) ? 'opacity-50' : 'hover:bg-gray-500'}
    `}>RUN</button
	>
	<div class="text-lg">
		{message}
	</div>
</div>
