<script lang="ts">
	import { Router, Route } from 'svelte-navigator';
	import AffineCipher from './pages/affine-cipher.svelte';
	import EnigmaCipher from './pages/enigma-cipher.svelte';
	import ExtendedVigenereCipher from './pages/extended-vigenere-cipher.svelte';
	import HillCipher from './pages/hill-cipher.svelte';
	import Home from './pages/home.svelte';
	import PlayfairCipher from './pages/playfair-cipher.svelte';
	import VarianVigenereCipher from './pages/varian-vigenere-cipher.svelte';
	import VigenereCipher from './pages/vigenere-cipher.svelte';
</script>

<Router>
	<main class="app bg-slate-300 flex justify-center">
		<div class="w-1/2">
			<Route path="/*" primary={false}>
				<Route path="/">
					<Home />
				</Route>
				<Route path="/vigenere-cipher">
					<VigenereCipher />
				</Route>
				<Route path="/varian-vigenere-cipher">
					<VarianVigenereCipher />
				</Route>
				<Route path="/extended-vigenere-cipher">
					<ExtendedVigenereCipher />
				</Route>
				<Route path="/affine-cipher">
					<AffineCipher />
				</Route>
				<Route path="/playfair-cipher">
					<PlayfairCipher />
				</Route>
				<Route path="/hill-cipher">
					<HillCipher />
				</Route>
				<Route path="/enigma-cipher">
					<EnigmaCipher />
				</Route>
			</Route>
		</div>
	</main>
</Router>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
