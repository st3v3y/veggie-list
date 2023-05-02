import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { db } from "$lib/database";
import type { PriceUnit } from '@prisma/client';
import type { Veg } from '$lib/types/veggie';


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

export const actions: Actions = {
	createveggie :  async ({request}) => {
		const formData = Object.fromEntries(await request.formData());
		const { name, name_es, isFavorite, price, unit, pictureUrl } = formData as unknown as { 
            name: string; 
            name_es: string; 
            isFavorite: string; 
			price: string;
			unit: string;
			pictureUrl: string;
        };
		await db.veggie.create({
			data: {
				name,
				name_es,
				is_favorite: isFavorite == "true",
				price: parseFloat(price.replace(",",".") ?? "0"),
				unit: unit as PriceUnit,
				picture_url: pictureUrl
			}
		});
		return { };
	},
	updateveggie :  async ({request}) => {
		const formData = Object.fromEntries(await request.formData());
		const { id, isFavorite, price, unit } = formData as unknown as { 
            id: string; 
            isFavorite: string; 
			price: string;
			unit: string;
        };
		await db.veggie.update({
			data: {
				is_favorite: isFavorite == "true",
				price: parseFloat(price.replace(",",".") ?? "0"),
				unit: unit as PriceUnit
			},
			where: { id: parseInt(id) }
		});
		return { };
	},
	deleteveggie :  async ({request}) => {
		const formData = Object.fromEntries(await request.formData());
		const { id } = formData as unknown as { id: string; };
		await db.veggie.delete({where : { id: parseInt(id) }});
		return { };
	}
}
