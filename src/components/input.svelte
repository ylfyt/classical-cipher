<script lang="ts">
	import { fileInput, isDecrypt, isFromFile, strInput } from '../stores/data';

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
				fileInput.set(data);
			});
		})();
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex rounded h-[40px]">
		<button
			class={`w-full shadow-md rounded-l-lg ${!$isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFromFile.set(false);
				strInput.set('');
				files = undefined;
			}}>Text</button
		>
		<button
			class={`rounded-r-lg shadow-md w-full ${$isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFromFile.set(true);
				strInput.set('');
				files = undefined;
			}}>File</button
		>
	</div>
	<div class="">
		{#if !$isFromFile}
			<textarea class={`w-full p-2 rounded-md ${$isDecrypt ? 'uppercase' : 'lowercase'}`} rows="5" placeholder="text" bind:value={$strInput} />
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
