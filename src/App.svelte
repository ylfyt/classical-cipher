<script lang="ts">
	import { Router, Route } from 'svelte-navigator';
	import Home from './pages/home.svelte';
  import VarianVigenereCipher from './pages/varian-vigenere-cipher.svelte';
  import VigenereCipher from './pages/vigenere-cipher.svelte';
</script>

<Router>
	<main class="app">
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
		</Route>
	</main>
</Router>

<style>
</style>
