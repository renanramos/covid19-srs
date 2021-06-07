import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { tap } from 'rxjs/operators';
import { Cases } from 'src/app/model/cases';
import { ConstantValues } from 'src/app/model/constants';
import { DatePickerConfig } from 'src/app/model/date-picker-config.model';
import { DataService } from 'src/app/service/data.service';
import { DataUtil } from 'src/app/shared/util/data-util';
import { GraphicsService } from '../../shared/service/graphics.service';

@Component({
	selector: 'srs-cases',
	templateUrl: './cases.component.html',
	styleUrls: ['./cases.component.css'],
	providers: [DataService]
})
export class CasesComponent implements OnInit {

	cases: any[] = [];

	chartData: ChartDataSets[] = Cases.chartData;

	chartLabels: Label[] = [];

	datePickerConfig: DatePickerConfig = new DatePickerConfig();

  form!: FormGroup;
  	
	constructor(
		private dataUtil: DataUtil, 
		private dataService: DataService, 
		private formBuilder: FormBuilder, 
		public bsConfig: BsDatepickerConfig, 
		private graphicService: GraphicsService) {}

	async ngOnInit() {
		this.createForm();
		await this.getCasesData();
	}

	createForm() {
    this.form = this.formBuilder.group({
			initial: [null, [Validators.required]],
			final: [null, [Validators.required]]
		});

		this.dataUtil.setDateFormValues(this.form);
	}

	async getCasesData() {
		const receivedCasesData = {
			next: (cases: any) => {
				this.cases = cases;
				this.filterChartData();
			},
			error: (error: any) => {
				console.log(error);
			}
		};

		await this.dataService.getCases()
				.pipe(tap(receivedCasesData))
				.toPromise()
				.then(() => true)
				.catch(() => false);
	}

	async submitFilter()
	{
		this.isValidDateValues();
		if (this.form.valid) {
			await this.getCasesData();
			this.resetChartvalues();
			this.filterChartData();
		}
	}

	isValidDateValues() {
		if (this.initial?.value > this.final?.value)
		{
			this.form?.setErrors({
					invalid: true
			});
		}
	}

	filterChartData() {
		this.dataUtil.filterChartData(this.form, this.cases, this.chartLabels, this.chartData);
		this.graphicService.updateChart({ data: this.chartData, label: this.chartLabels });
	}

	resetChartvalues() {
		this.chartData[0].data = [];
		this.chartData[1].data = [];
		this.chartLabels = [];
	}

	get initial() {
		return this.form?.get('initial');
	}

	get final() {
	  return this.form?.get('final');
	}
}
