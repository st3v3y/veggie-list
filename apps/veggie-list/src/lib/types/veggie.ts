export type Veggie = {
	id: string;
	name: string;
	name_es: string;
	price: number;
	unit: number;
	is_favorite: boolean;
	picture_url:string;
	created_at: Date;
	updated_at: Date;
};

export enum PriceUnit {
	"Unit",
	"Libra",
	"Kilogram",
	"Gram"
}