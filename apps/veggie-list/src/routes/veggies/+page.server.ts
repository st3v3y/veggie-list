import { error } from '@sveltejs/kit';
import { api } from './api';
import type { PageServerLoad, Action } from './$types';

type Veggie = {
	id: string;
	name: string;
	price: number;
	unit: PriceUnit;
	is_favorite: boolean;
	picture_url: string;
	created_at: Date;
	updated_at: Date;
};

enum PriceUnit {
	"Unit",
	"Libra",
	"Kilogram",
	"Gram"
}

export const load: PageServerLoad = async ({locals}) => {
	const response = await api('GET', locals.lang);
	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
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

export const POST: Action = async ({ request }) => {
	const form = await request.formData();

	await api('POST', `create`, {
		name: form.get('name'),
		name_es: form.get('name_es'),
		is_favorite: form.get('isFavorite') == "true",
		price: parseFloat(form.get('price')?.toString() ?? "0"),
		unit: form.get('unit'),
		picture_url: form.get('pictureUrl'),
	});
};

export const PATCH: Action = async ({ request }) => {
	const form = await request.formData();

	await api('PUT', `update/${form.get('id')}`, {
		// name: form.get('name'),
		is_favorite: form.get('isFavorite') == "true",
		price: parseFloat(form.get('price')?.toString() ?? "0"),
		unit: form.get('unit'),
		// picture_url: form.get('pictureUrl'),
	});
};

export const DELETE: Action = async ({ request }) => {
	const form = await request.formData();

	await api('DELETE', `delete/${form.get('id')}`);
};
