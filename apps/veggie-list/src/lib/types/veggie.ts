import type { Veggie } from "@prisma/client";

export type VeggieExt = {
	order_unit: PriceUnit;
	amount: number;
	hasComment: boolean;
	comment: string;
};

export type Veg = Veggie & VeggieExt;

export enum PriceUnit {
	unit,
	dollar,
	libra,
	kilogram,
	gram
}