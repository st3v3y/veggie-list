<script context="module">
	import { waitLocale } from 'svelte-i18n'
	import { onMount } from 'svelte'

	export async function preload() {
		// awaits for the loading of the 'es' and 'en' dictionaries
		return waitLocale()
	}
</script>

<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { isLoading, register, init, getLocaleFromNavigator } from 'svelte-i18n';
	import '../app.css';
	import { Modals, closeModal } from 'svelte-modals';
	import Notifications from 'svelte-notifications';
	import { pwaInfo } from 'virtual:pwa-info';

	register('es', () => import('../locales/es.json'));
    register('en', () => import('../locales/en.json'));
	
	init({
        fallbackLocale: 'es',
        initialLocale: getLocaleFromNavigator(),
    });

	onMount(async () => {
		if (pwaInfo) {
		const { registerSW } = await import('virtual:pwa-register')
		registerSW({
			immediate: true,
			onRegistered(r: any) {
				// uncomment following code if you want check for updates
				// r && setInterval(() => {
				//    console.log('Checking for sw update')
				//    r.update()
				// }, 20000 /* 20s for testing purposes */)
				console.log(`SW Registered: ${r}`)
			},
			onRegisterError(error: any) {
				console.log('SW registration error', error)
			}
		})
		}
	})
	
	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

<Modals>
	<div
	  slot="backdrop"
	  class="backdrop"
	  on:click={closeModal}
	/>
</Modals>

<Notifications>
	{#if $isLoading} 
		Loading...
	{:else}
		<Header />

		<main>
			<slot />
		</main>

		<footer>
			<p>Made with <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f87171" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 inline-block"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg> by <a href="https://github.com/st3v3y/">st3v3y</a></p>
		</footer>
	{/if}
</Notifications>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0,0,0,0.50)
	}
</style>
