<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { dataOutput, fileInput, isDecrypt, isFromFile } from '../stores/data';
	import { bytesToStr } from '../utils/bytes-to-str';
	import { getFileNameInfo } from '../utils/get-file-extension';

	let strOutput: string = '';
	let isSeparated: boolean = false;
	let isText: boolean | null = null;

	$: (() => {
		if (!$dataOutput || $dataOutput.length === 0) {
			isText = null;
			return;
		}
		for (const byte of $dataOutput) {
			if (byte > 127) {
				isText = false;
				return;
			}
		}
		isText = true;
	})();

	$: if ($dataOutput) {
		strOutput = '';
		if ($dataOutput.length !== 0 && isText) {
			let i = 0;
			while (strOutput.length < 10000 && i < $dataOutput.length) {
				strOutput += String.fromCharCode($dataOutput[i++]);
				if (i % 5 === 0 && isSeparated) {
					strOutput += '\xa0\xa0\xa0';
				}
			}
			if (strOutput.length < $dataOutput.length) {
				strOutput += '..........................................................';
			}
		}
	}

	// TODO: OPTIMIZE OUTPUT

	const downloadURL = function (data: string, fileName: string) {
		const a = document.createElement('a');
		a.href = data;
		a.download = fileName;
		document.body.appendChild(a);
		a.style.display = 'none';
		a.click();
		a.remove();
	};

	const download = () => {
		const data = new Uint8Array($dataOutput);

		let filename = `${$selectedCipher.label}-${$isDecrypt ? 'decrypted' : 'encrypted'}.txt`;
		if ($isFromFile) {
			const fileInfo = getFileNameInfo($fileInput?.file.name);
			filename = `${fileInfo.filename}-${$isDecrypt ? 'decrypted' : 'encrypted'}${fileInfo.extension}`;
		}

		const blob = new Blob([data as BlobPart], {});
		const url = window.URL.createObjectURL(blob);
		downloadURL(url, filename);
		setTimeout(function () {
			return window.URL.revokeObjectURL(url);
		}, 1000);
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(bytesToStr($dataOutput))
			.then(() => {
				alert('success');
			})
			.catch((e) => {
				console.log('err', e);
			});
	};
</script>

<div>
	<div class="flex items-center justify-between mb-2">
		<div class="text-xl font-semibold">Output</div>
		<div class="flex items-center gap-4">
			<div class="flex gap-2">
				<input bind:checked={isSeparated} type="checkbox" />
				<label for="">Separated by 5 Char</label>
			</div>
			<button disabled={!$dataOutput || $dataOutput.length === 0} on:click={download} class="bg-green-500 text-white px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
				>Download as File</button
			>
			<button
				disabled={!$dataOutput || $dataOutput.length === 0 || !isText}
				on:click={copyToClipboard}
				class="bg-gray-500 text-white px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">Copy to Clipboard</button
			>
		</div>
	</div>

	{#if $dataOutput?.length !== 0 && isText === false}
		<div class="border-2 p-2 min-h-[50px] rounded-md flex items-center">
			<div class="bg-red-300 text-center w-3/4 mx-auto">Output is a binary file. Please download it!</div>
		</div>
	{:else}
		<div class={`border-2 p-2 min-h-[50px] rounded-md break-words ${$isDecrypt ? 'lowercase' : 'uppercase'}`}>
			{strOutput}
		</div>
	{/if}
</div>
