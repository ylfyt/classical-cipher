<script lang="ts">
	import { dataOutput } from '../stores/data';
	import { bytesToStr } from '../utils/bytes-to-str';

	let strOutput = '';
	$: dataOutput &&
		(() => {
			strOutput = bytesToStr($dataOutput);
		})();

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

		const blob = new Blob([data as BlobPart], {});
		const url = window.URL.createObjectURL(blob);
		downloadURL(url, 'download');
		setTimeout(function () {
			return window.URL.revokeObjectURL(url);
		}, 1000);
	};
</script>

<div>
	<div class="flex items-center justify-between mb-2">
		<div class="text-xl font-semibold">Output</div>
		<div>
			<button on:click={download} class="bg-green-500 text-white px-4 py-1 rounded-2xl shadow-md">Download as File</button>
		</div>
	</div>
	<div class="border-2 p-2 min-h-[50px] rounded-md break-words">{strOutput}</div>
</div>
