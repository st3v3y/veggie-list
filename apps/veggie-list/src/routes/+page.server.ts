import type { PageServerLoad } from "./$types";
import { db } from "$lib/database";
import type { Veg } from "$lib/types/veggie";

export const load: PageServerLoad = async ({locals}) => {
	let veggies = [];
	if (locals.lang == 'es') {
		veggies = await db.veggie.findMany({
		  	orderBy: { name_es: 'asc' },
		});
	} else {
		veggies = await db.veggie.findMany({
				orderBy: { name: 'asc' },
		});
	}
	return { veggies: veggies as Veg[] };
};