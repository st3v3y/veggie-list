export type Veggie = {
	id: string;
	name: string;
	name_es: string;
	price: number;
	unit: PriceUnit;
	is_favorite: boolean;
	picture_url:string;
	created_at: Date;
	updated_at: Date;

	order_unit: PriceUnit;
	amount: number;
	hasComment: boolean;
	comment: string;
};

export enum PriceUnit {
	unit,
	dollar,
	libra,
	kilogram,
	gram
}