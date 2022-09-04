<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { enhance } from '$lib/form';
	import { form, field } from 'svelte-forms';
  	import { required, min, pattern } from 'svelte-forms/validators';
	import { createApi } from 'unsplash-js';
	import { fade, scale } from 'svelte/transition';
    import enFlag from '$lib/assets/flags/en.svg';
    import esFlag from '$lib/assets/flags/es.svg';


	const unsplash = createApi({
		accessKey: 'NVXATDH5GSdN0Jxna3Ja7oOyfFtY4lge0ar81LGKdUk',
	});

	let createFormOpen:boolean = false;

	// import type { PageData } from './$types';

	const name = field('name', '', [required()], { valid: false });
	const name_es = field('name_es', '', [required()], { valid: false });
	const price = field('price', '', [required(), pattern(/^[+-]?\d+([.,]\d+)?$/), min(0)], { valid: false });

  	const myForm = form(name, name_es, price);

	// export let data: PageData;
	let isFavorite: boolean = false;
	let photoSuggestions:string[] = [];
	let photoUrl:string = "";
	let photoIndex = 0;

	const next = () => {
		photoIndex = (photoIndex + 1) % photoSuggestions.length;
		photoUrl = photoSuggestions[photoIndex];
	}

	async function onBlurNameField() {
		const photos = await unsplash.search.getPhotos({
			query: $name.value,
			page: 1,
			perPage: 15,
		});

		if (!photos || !photos.response) {
			return;
		}

		const results = photos.response?.results ?? [];
		photoSuggestions = results.map((x) => x.urls.small);

		//set the first image as used image
		if (photoSuggestions.length > 0) {
			photoUrl = photoSuggestions[0];
		}
	}

	function onFormSubmitClick () {
		createFormOpen = false;
	}

	function toggleIsFavorite(){
		isFavorite = !isFavorite;
	}
</script>

{#if createFormOpen}
    <div transition:scale class="flex flex-col max-w-[600px] w-full mt-6">
        <div class="flex flex-row mt-6 p-8 shadow-veggie bg-[#F9FAFC] rounded-2xl gap-4 relative">
            <div class="absolute top-4 right-4 cursor-pointer" on:click={() => createFormOpen = false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            </div>
            <div class="relative w-[80px]">
                {#if photoSuggestions.length > 0}
                    <div class="bg-gray-300 rounded-full w-[80px] h-[80px] overflow-hidden">
                        {#each [photoSuggestions[photoIndex]] as src (photoIndex)}
                            <input transition:fade class="object-cover h-full w-full" type="image" {src} alt="Veggie photo" />
                        {/each}
                    </div>
                
                    <button on:click={next}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57CC34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-repeat"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                    </button>
                {:else}
                    <div class="absolute top-0 bg-gray-300 rounded-full w-[80px] h-[80px] overflow-hidden"></div>
                {/if}
            </div>

            <div class="grow md:mr-14">
                <form
                    action="/veggies"
                    method="post"
                    use:enhance={{
                        result: async ({ form }) => {
                            $name.value = "";
                            $name_es.value = "";
                            form.reset();
                            photoSuggestions = [];
                            photoIndex = 0;
                        }
                    }}
                >
                    <input type="hidden" name="pictureUrl" bind:value={photoUrl} />
                    <div class="flex">
                        <div class="grow">
                            <div class="relative">
                                <input type="text" bind:value={$name.value} on:blur={onBlurNameField} name="name" class="form-input w-full pl-12 pr-4 py-3 rounded-lg rounded-b-none  border border-slate-400" aria-label="Enter Veggie name" placeholder={$_("page.veggies.form.name.placeholder")}  />
                                <img title="English" alt="eng" src={enFlag} class="max-w-[23px] absolute top-4 left-4" />
                            </div>
                            <div class="relative">
                                <input type="text" bind:value={$name_es.value} name="name_es" class="form-input w-full pl-12 pr-4 py-3 rounded-lg rounded-t-none border border-slate-400 mt-[-1px]" aria-label="Enter spanish Veggie name" placeholder={$_("page.veggies.form.name_es.placeholder")}  />
                                <img title="Spanish" alt="esp" src={esFlag} class="max-w-[23px] absolute top-4 left-4" />
                            </div>

                            {#if $myForm.hasError('name.required')}
                                <div class="text-red-600 text-sm">{$_('page.veggies.form.name.validation.required')}</div>
                            {:else if $myForm.hasError('name_es.required')}
                                <div class="text-red-600 text-sm">{$_('page.veggies.form.name_es.validation.required')}</div>
                            {/if}
                        </div>
                        <div class="flex-none w-14 flex items-center">
                            <div on:click={toggleIsFavorite} class="cursor-pointer ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "#57CC34" : "#AAAAAA"} stroke={isFavorite ? "#57CC34" : "#AAAAAA"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            </div>
                        </div>
                        <input type="hidden" name="isFavorite" bind:value={isFavorite}>
                    </div>
                    <div class="flex mt-3 w-full">
                        <div class=" relative">
                            <span class="absolute top-3 left-4 text-gray-400">$</span>
                            <input name="price" bind:value={$price.value}  class="form-input w-full pl-8 pr-4 py-3 rounded-lg border border-slate-400" aria-label="Add Veggie" placeholder={$_("page.veggies.form.price.placeholder")}  />
                            {#if $myForm.hasError('price.required')}
                                <div class="text-red-600 text-sm">{$_('page.veggies.form.price.validation.required')}</div>
                            {:else if $myForm.hasError('price.pattern')}
                                <div class="text-red-600 text-sm">{$_('page.veggies.form.price.validation.invalid')}</div>
                            {:else if $myForm.hasError('price.min')}
                                <div class="text-red-600 text-sm">{$_('page.veggies.form.price.validation.min')}</div>
                            {/if}
                        </div>
                        <span class="mt-3 mx-4">/</span>
                        <div class="grow">
                            <select name="unit" class="form-input w-full px-3 py-3 rounded-lg border border-slate-400">
                                <option value="Unit">{$_('constants.units.unit')}</option>
                                <option value="Libra">{$_('constants.units.libras')}</option>
                                <option value="Kilogram">{$_('constants.units.kilograms')}</option>
                                <option value="Gram">{$_('constants.units.grams')}</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex mt-3 w-full">
                        <button class="shadow-veggie p-2 rounded-lg disabled:opacity-50" disabled={!$myForm.valid} on:click={onFormSubmitClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57CC34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
{:else}
    <button in:scale={{delay:500}} class="shadow-veggie p-4 rounded-lg bg-white flex gap-2 text-lg mt-4 disabled:opacity-50" disabled={createFormOpen} on:click={() => createFormOpen = true}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#57CC34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
        {$_('page.veggies.form.submit.label')}
    </button>
{/if}