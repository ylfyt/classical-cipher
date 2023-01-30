<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
	import { secretKey } from '../stores/data';
</script>

<div>
	{#if $selectedCipher.keyType !== 'matrix'}
		<div class="flex flex-col">
			<label for="key">Secret Key</label>
			<input
				bind:value={$secretKey}
				class="p-2 rounded-md"
				placeholder="Key..."
				type="text"
			/>
		</div>
	{:else}
		<div>matrix</div>
	{/if}
</div>
