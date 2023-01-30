<script lang="ts">
	import CipherOption from '../components/cipher-option.svelte';
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
	import { selectedCipher } from '../stores/ciphers';
	import { fileInput, dataOutput, isDecrypt, secretKey, strInput, isFromFile } from '../stores/data';
	import { strToUtf16Bytes } from '../utils/str-to-16-bytes';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-10">{$selectedCipher.name}</h1>
	<div class="flex flex-col gap-5">
		<CipherOption />
		<Key />
		<Input />
		<div class="flex gap-2 px-4 py-2 border-2 rounded-md">
			<button
				disabled={$secretKey.length === 0 || ($isFromFile ? $fileInput.length === 0 : $strInput.length === 0)}
				on:click={() => {
					if ($isDecrypt) {
						const result = $selectedCipher.decrypter($isFromFile ? $fileInput : strToUtf16Bytes($strInput), strToUtf16Bytes($secretKey));
						dataOutput.set(result);
						return;
					}

					const result = $selectedCipher.encrypter($isFromFile ? $fileInput : strToUtf16Bytes($strInput), strToUtf16Bytes($secretKey));
					dataOutput.set(result);
				}}
				class={`disabled:cursor-not-allowed p-2 bg-gray-400 shadow-md rounded-md text-black
          ${$secretKey.length === 0 || ($isFromFile ? $fileInput.length === 0 : $strInput.length === 0) ? 'opacity-50' : 'hover:bg-gray-500'}
        `}>RUN</button
			>
		</div>
		<Output />
	</div>
</div>
