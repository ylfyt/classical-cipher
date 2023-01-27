<script lang="ts">
	import { dataInput } from '../stores/data-input';
</script>

<div>
	<div>Output</div>
	<div class="border-2 p-2 min-h-[50px] rounded-md break-words">{$dataInput.data}</div>
</div>
