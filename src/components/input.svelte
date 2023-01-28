<script lang="ts">
	import { dataInput, isDecrypt, strInput } from '../stores/data';
	import { strToUtf16Bytes } from '../utils/str-to-16-bytes';

	let isFile = false;
	let files: FileList;

	$: {
		(() => {
			if (!files || files.length === 0) return;
			const file = files[0];
			file.arrayBuffer().then((buff) => {
				const uint8 = new Uint8Array(buff);
				const data: number[] = [];
				for (let i = 0; i < uint8.length; i++) {
					data.push(uint8[i]);
				}
				dataInput.set(data);
			});
		})();
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex rounded h-[40px]">
		<button
			class={`w-full shadow-md rounded-l-lg ${!isFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFile = false;
				strInput.set('');
				files = undefined;
			}}>Text</button
		>
		<button
			class={`rounded-r-lg shadow-md w-full ${isFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFile = true;
				strInput.set('');
				files = undefined;
			}}>File</button
		>
	</div>
	<div class="">
		{#if !isFile}
			<textarea
				on:change={() => {
					const bytes = strToUtf16Bytes($isDecrypt ? $strInput.toUpperCase() : $strInput.toLowerCase());
					dataInput.set(bytes);
				}}
				class={`w-full p-2 rounded-md ${$isDecrypt ? 'uppercase' : 'lowercase'}`}
				rows="5"
				placeholder="text"
				bind:value={$strInput}
			/>
		{:else}
			<input bind:files class="bg-white file:rounded-md file:bg-gray-300 hover:file:bg-gray-600 w-full p-2 rounded-md" type="file" />
		{/if}
	</div>
</div>

<style>
	input[type='file']::file-selector-button {
		margin-right: 20px;
		border: none;
		padding: 10px 20px;
		color: #fff;
		cursor: pointer;
	}
</style>
