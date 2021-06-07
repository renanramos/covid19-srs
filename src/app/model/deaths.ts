import { ChartDataSets } from 'chart.js';
import { ConstantValues } from './constants';

export class Deaths {
	public name: string = '';
	public static chartData: ChartDataSets[] = [
		{
			label: ConstantValues.TOTAL_DEATHS_TITLE,
			data: [],
			type: 'bar',
			order: 3
		},
		{
			label: ConstantValues.NEW_DEATHS_TITLE,
			data: [],
			order: 2
		},
		{
			label: ConstantValues.ROLLING_AVERAGE_TITLE,
			data: [],
			order: 1
		}
	];
}
