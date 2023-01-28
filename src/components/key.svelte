<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { secretKey } from '../stores/data';
	import { strToUtf16Bytes } from '../utils/str-to-16-bytes';

	let textKey: string = '';
</script>

<div>
	{#if $selectedCipher.keyType !== 'matrix'}
		<div class="flex flex-col">
			<label for="key">Secret Key</label>
			<input
				on:change={() => {
					const bytes = strToUtf16Bytes(textKey);
					secretKey.set(bytes);
				}}
				bind:value={textKey}
				class="p-2 rounded-md"
				placeholder="Key..."
				type="text"
			/>
		</div>
	{:else}
		<div>matrix</div>
	{/if}
</div>
