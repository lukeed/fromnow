declare module 'fromnow' {
	export type DateOkay = Date | string | number;

	export interface Options {
		and?: boolean,
		suffix?: boolean,
		zero?: boolean,
		max?: number,
	}

	export default function (date: DateOkay, opts?: Options): string;
}