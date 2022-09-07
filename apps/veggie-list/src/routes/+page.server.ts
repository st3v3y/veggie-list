import type { Veggie } from "$lib/types/veggie";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/todos/$types";
import { error } from "@sveltejs/kit";
import { api } from "./veggies/api";

export const load: PageServerLoad = async ({locals}) => {
	const response = await api('GET', locals.lang ?? '');
	if (response.status === 404) {
		return {
			veggies: [] as Veggie[]
		};
	}

	if (response.status === 200) {
		return {
			veggies: (await response.json()) as Veggie[]
		};
	}

	throw error(response.status);
};