<script lang="ts">
    import { _, locale } from 'svelte-i18n';
	import { fade, scale } from 'svelte/transition';
    import { quartInOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import type { Veggie } from '../../types/veggie';
	import { enhance } from '$lib/form';
    import { form, field } from 'svelte-forms';
  	import { required, min, pattern } from 'svelte-forms/validators';
    import Modal from '../modal/modal.svelte';

    export let veggie:Veggie|null;

    let isEdit:boolean = false;

    let showModal: boolean =false;

    const price = field('price', veggie?.price, [required(), pattern(/^[+-]?\d+([.,]\d+)?$/), min(0)]);
    const myForm = form(price);

    const imgSize = tweened(60, {
        duration: 1000,
        easing: quartInOut,
    });
    const starSize = tweened(15, {
        duration: 1000,
        easing: quartInOut,
    });

    function onEditClick() {
        isEdit = !isEdit;
        imgSize.set(isEdit ? 80 : 60);
        starSize.set(isEdit ? 20 : 15);
    }

</script>

{#if veggie != null}
    <Modal title="Are you sure?" message={`Do you really want to delete "${veggie.name}"?`} isOpen={showModal} >
        <div slot="actions" class="flex gap-5 justify-end mt-5">
            <form 
                action="/veggies?_method=DELETE" 
                method="post" 
                use:enhance={{
                    result: async ({ form }) => {
                        form.reset();
                    }
                }}
            >
                <input type="hidden" name="id" bind:value={veggie.id} />
                <button class="bg-red-500 text-white p-2 rounded-lg">Yes</button>
            </form>
            <button on:click={() => showModal = false}>Cancel</button>
        </div>
    </Modal>
    <div class="shadow-veggie flex flex-row items-center justify-between max-w-[600px] w-full mb-6 px-5 py-8 bg-[#F9FAFC] gap-5 rounded-xl">
        <div transition:scale class="rounded-full overflow-hidden" style:width={$imgSize + "px"} style:height={$imgSize + "px"}>
            <input class="object-cover h-full w-full cursor-default" type="image" src={veggie.picture_url} alt={veggie.name} />
        </div>

        <div class="grow flex flex-col">
            <div class="flex flex-row gap-2 items-center">
                <h3 class="text-2xl font-bold">
                    {#if $locale?.startsWith('es')}
                        {veggie.name_es}
                    {:else}
                        {veggie.name}
                    {/if}
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" on:click={() => (isEdit && veggie) ? veggie.is_favorite = !veggie.is_favorite : ""} class:cursor-pointer={isEdit} width={$starSize} height={$starSize} viewBox="0 0 24 24" fill={veggie.is_favorite ? "#57CC34" : "#AAAAAA"} stroke={veggie.is_favorite ? "#57CC34" : "#AAAAAA"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                {#if !isEdit}
                    <span transition:fade class="text-[#AAA]">${veggie.price} / {$_(`constants.units.${veggie.unit}`)}</span>
                {/if}
            </div>
            <div>
                <form
                    action="/veggies?_method=PATCH"
                    method="post"
                    use:enhance={{
                        result: async ({ form }) => {
                            form.reset();
                        }
                    }}
                >
                    <input type="hidden" name="id" bind:value={veggie.id} />
                    <input type="hidden" name="isFavorite" bind:value={veggie.is_favorite} />
                    {#if isEdit}
                        <div transition:fade class="flex justify-start mt-3 w-full gap-4">
                            <div class=" relative">
                                <span class="absolute top-3 left-4 text-gray-400">$</span>
                                <input name="price" bind:value={$price.value}  class="form-input w-full pl-8 pr-4 py-3 rounded-lg border border-slate-400" aria-label="Add Veggie" placeholder={$_("page.veggies.form.price.placeholder")}  />
                                {#if $myForm.hasError('price.required')}
                                    <div class="text-red-600 text-sm">{$_('pages.veggies.form.validation.price_required', {default:'Price is required'})}</div>
                                {:else if $myForm.hasError('price.pattern')}
                                    <div class="text-red-600 text-sm">{$_('pages.veggies.form.validation.price_invalid', {default:'Please enter a valid number'})}</div>
                                {:else if $myForm.hasError('price.min')}
                                    <div class="text-red-600 text-sm">{$_('pages.veggies.form.validation.price_min', {default:'Please enter a price > 0'})}</div>
                                {/if}
                            </div>
                            <span class="mt-3">/</span>
                            <div class="min-w-[120px]">
                                <select name="unit" bind:value={veggie.unit} class="form-input w-full px-3 py-3 rounded-lg border border-slate-400">
                                    <option value="unit">{$_('constants.units.unit')}</option>
                                    <option value="libra">{$_('constants.units.libra')}</option>
                                    <option value="kilogram">{$_('constants.units.kilogram')}</option>
                                    <option value="gram">{$_('constants.units.gram')}</option>
                                </select>
                            </div>
                            <button class="shadow-veggie p-2 rounded-lg disabled:opacity-50" disabled={!$myForm.valid} on:click={onEditClick}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                        </div>
                    {/if}
                </form>
            </div>
        </div>
        <div>
            {#if !isEdit}
                <button on:click={onEditClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
            {:else} 
                <button on:click={() => showModal = true}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            {/if}
        </div>
    </div>
{/if}