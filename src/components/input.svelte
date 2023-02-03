<script lang="ts">
	import { dataOutput, fileInput, isDecrypt, isFromFile, strInput } from '../stores/data';
	import { bytesToStr } from '../utils/bytes-to-str';

	let files: FileList;

	let preview: string = '';

	$: if (files && files.length !== 0) {
		const file = files[0];
		const fr = new FileReader();
		fr.onload = (e) => {
			preview = '';
			if (!e.target.result) return;
			const data = new Uint8Array(e.target.result as ArrayBuffer);

			for (const byte of data) {
				if (byte > 127) {
					preview = '';
					fileInput.set({
						file,
						isText: false,
					});
					return;
				}
			}
			fileInput.set({
				file,
				isText: true,
			});

			preview = bytesToStr(new Uint8Array(Array.from(data.slice(0, 10000))));
		};
		fr.readAsArrayBuffer(file);
	}
</script>

<div class="flex flex-col gap-4">
	<div class="flex rounded h-[40px]">
		<button
			class={`w-full shadow-md rounded-l-lg ${!$isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFromFile.set(false);
				strInput.set('');
				fileInput.set(undefined);
				dataOutput.set(null);
				files = undefined;
			}}>Text</button
		>
		<button
			class={`rounded-r-lg shadow-md w-full ${$isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
			on:click={() => {
				isFromFile.set(true);
				strInput.set('');
				fileInput.set(undefined);
				dataOutput.set(null);
				files = undefined;
			}}>File</button
		>
	</div>
	<div class="flex flex-col gap-4">
		{#if !$isFromFile}
			<textarea class={`w-full p-2 rounded-md ${$isDecrypt ? 'uppercase' : 'lowercase'}`} rows="8" placeholder="text" bind:value={$strInput} />
		{:else}
			<input bind:files class="bg-white file:rounded-md file:bg-gray-300 hover:file:bg-gray-400 w-full p-2 rounded-md" type="file" />
			{#if $fileInput?.isText}
				<textarea disabled class={`w-full p-2 rounded-md ${$isDecrypt ? 'uppercase' : ''}`} rows="5" placeholder="text">{preview}</textarea>
			{/if}
		{/if}
	</div>
</div>

<style>
	input[type='file']::file-selector-button {
		margin-right: 20px;
		border: none;
		padding: 10px 20px;
		color: black;
		cursor: pointer;
	}
</style>
