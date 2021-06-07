import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ConstantValues } from 'src/app/model/constants';

@Injectable({
	providedIn: 'root'
})
export class DataUtil {
	data: any[] = [];
	chartData: ChartDataSets[] = [];

	constructor(private datePipe: DatePipe){ }

	setDateFormValues(form: FormGroup) {
		const initial = form.get('initial');
		if (initial && !initial.value) {

      const final = form.get('final');

      const today = new Date();
		  const firstDay = new Date(today.getFullYear(), today.getMonth() -1, today.getDate());

			initial?.setValue(firstDay);
			final?.setValue(today);
		}
	}

	async filterChartData(form: FormGroup, data: any[], chartLabels: Label[], chartData: ChartDataSets[]) {
		const initialDate = form.get('initial')?.value;
		const finalDate = form.get('final')?.value;

		const dataTotal = data[ConstantValues.TOTAL_INDEX].data.filter((c: any) => this.isValidDate(new Date(c[0]), initialDate, finalDate));
		const dataNew = data[ConstantValues.NEW_INDEX].data.filter((c: any) => this.isValidDate(new Date(c[0]), initialDate, finalDate));
		const dataRollingAverage = data[ConstantValues.ROLLING_AVERAGE_INDEX].data.filter((c: any) => this.isValidDate(new Date(c[0]), initialDate, finalDate));

		await this.setTotalCases(dataTotal, chartData);
		await this.setNewCases(dataNew, chartData);
		await this.setRollingAverage(dataRollingAverage, chartData);

	  this.setDataLabels(dataTotal, chartLabels);
	}

	private isValidDate = (date: Date, init: Date, final: Date) => {
		return date >= new Date(init) && date <= new Date(final);
	}

	private async setRollingAverage(data: any[], chartData: ChartDataSets[]) {
		data.forEach((c: any) => 
			chartData[ConstantValues.ROLLING_AVERAGE_INDEX].data?.push(c[1]));
	}

	private async setNewCases(data: any[], chartData: ChartDataSets[]) {
		data.forEach((c: any) => 
			chartData[ConstantValues.NEW_INDEX].data?.push(c[1]));
	}

	private async setTotalCases(data: any[], chartData: ChartDataSets[]) {
		data.forEach((c: any) =>
			chartData[ConstantValues.TOTAL_INDEX].data?.push(c[1]));
	}

	setDataLabels(data: any[], chartLabels: Label[]) {
			data.forEach((c: any) => {
					const dateFormatted: Label = this.datePipe.transform(c[ConstantValues.LABEL_INDEX], 'dd/MM/YYYY') || "";
					chartLabels.push(dateFormatted);
			});
	}
}
