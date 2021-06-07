import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { tap } from 'rxjs/operators';
import { DatePickerConfig } from 'src/app/model/date-picker-config.model';
import { Deaths } from 'src/app/model/deaths';
import { DataService } from 'src/app/service/data.service';
import { GraphicsService } from 'src/app/shared/service/graphics.service';
import { DataUtil } from 'src/app/shared/util/data-util';

@Component({
	selector: 'srs-deaths',
	templateUrl: './deaths.component.html',
	styleUrls: ['./deaths.component.css'],
	providers: [DataService]
})
export class DeathsComponent implements OnInit {
	deaths: any[] = [];

	chartData: ChartDataSets[] = Deaths.chartData;

	chartLabels: Label[] = [];

	datePickerConfig: DatePickerConfig = new DatePickerConfig();

  form!: FormGroup;

	constructor(
		private dataUtil: DataUtil,
		private dataService: DataService,
		private formBuilder: FormBuilder,
		public bsConfig: BsDatepickerConfig,
		private graphicService: GraphicsService
	) {}

	async ngOnInit() {
		this.createForm();
		await this.getDeathsData();
	}
	createForm() {
		this.form = this.formBuilder.group({
			initial: [null, [Validators.required]],
			final: [null, [Validators.required]]
		});

		this.dataUtil.setDateFormValues(this.form);
	}

	async getDeathsData() {

		const receivedDeathsData = {
			next: (deaths: any) => {
				this.deaths = deaths;
				this.filterChartData();
			},
			error: (error: any) => {
				console.log(error);
			}
		}

		await this.dataService.getDeathsData()
			.pipe(tap(receivedDeathsData))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	async submitFilter()
	{
		this.isValidDateValues();
		if (this.form.valid) {
			await this.getDeathsData();
			this.resetChartvalues();
			this.filterChartData();
		}
	}

	filterChartData() {
		this.dataUtil.filterChartData(this.form, this.deaths, this.chartLabels, this.chartData);
		this.graphicService.updateChart({ data: this.chartData, label: this.chartLabels });
	}

	resetChartvalues() {
		this.chartData[0].data = [];
		this.chartData[1].data = [];
		this.chartLabels = [];
	}

	isValidDateValues() {
		if (this.initial?.value > this.final?.value)
		{
			this.form?.setErrors({
					invalid: true
			});
		}
	}

	get initial() {
		return this.form?.get('initial');
	}

	get final() {
	  return this.form?.get('final');
	}
}
