<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import enFlag from '$lib/assets/flags/en.svg';
    import esFlag from '$lib/assets/flags/es.svg';

    export let value:string|null|undefined = 'en';
    
    const dispatch = createEventDispatcher();
    function switchLocale(lang:string) {
        dispatch('locale-changed', lang);
    }
</script>
<style>
    .choose-locale {
        margin-top: 1rem;
        margin-right: 1rem;
    }
    .flag {
        cursor: pointer;
        max-width: 30px;
    }
</style>
<div class="choose-locale">
    {#if value == "es"}
        <div class="flag" on:click|once={() => switchLocale("en")}>
            <img title="English" alt="eng" src="/flags/en.svg" />
        </div>
    {/if}
    {#if value == 'en'}
        <div class="flag" on:click|once={() => switchLocale("es")}>
            <img title="Español" alt="es" src="/flags/es.svg" />
        </div>
    {/if}
</div>