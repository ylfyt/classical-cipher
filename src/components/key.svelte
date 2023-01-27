<script lang="ts">
	import { selectedCipher } from '../stores/ciphers';
</script>

<div>
	{#if $selectedCipher.keyType !== 'matrix'}
		<div class="flex flex-col">
			<label for="key">Secret Key</label>
			<input class="p-2 rounded-md" placeholder="Key..." type="text" />
		</div>
	{:else}
		<div>matrix</div>
	{/if}
</div>
