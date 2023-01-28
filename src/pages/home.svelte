<script lang="ts">
	import CipherOption from '../components/cipher-option.svelte';
	import Input from '../components/input.svelte';
	import Key from '../components/key.svelte';
	import Output from '../components/output.svelte';
	import { selectedCipher } from '../stores/ciphers';
	import { dataInput, dataOutput, isDecrypt, secretKey } from '../stores/data';
</script>

<div class="">
	<h1 class="text-4xl text-center mb-10">{$selectedCipher.name}</h1>
	<div class="flex flex-col gap-5">
		<CipherOption />
		<Key />
		<Input />
		<div class="flex gap-2 px-4 py-2 border-2 rounded-md">
			<button
				on:click={() => {
					if ($isDecrypt) {
						const result = $selectedCipher.decrypter($dataInput, $secretKey);
						dataOutput.set(result);
						return;
					}

					const result = $selectedCipher.encrypter($dataInput, $secretKey);
					dataOutput.set(result);
				}}
				class="p-2 bg-gray-300 shadow-md rounded-md hover:bg-gray-400">RUN</button
			>
		</div>
		<Output />
	</div>
</div>
