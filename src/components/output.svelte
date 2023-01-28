<script lang="ts">
	import { dataOutput } from '../stores/data';
	import { bytesToStr } from '../utils/bytes-to-str';

	let strOutput = '';
	$: dataOutput &&
		(() => {
			strOutput = bytesToStr($dataOutput);
		})();
</script>

<div>
	<div>Output</div>
	<div class="border-2 p-2 min-h-[50px] rounded-md break-words">{strOutput}</div>
</div>
