import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { tap } from 'rxjs/operators';
import { Cases } from 'src/app/model/cases';
import { DateForm } from 'src/app/model/date-form';
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

	dateForm!: DateForm;

	constructor(
		private dataUtil: DataUtil,
		private dataService: DataService,
		private graphicService: GraphicsService
	) {}

	async ngOnInit() {
		await this.getCasesData();
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

		await this.dataService
			.getCases()
			.pipe(tap(receivedCasesData))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	async dateChanged(dateForm: DateForm) {
		this.dateForm = dateForm;
		await this.getCasesData();
		this.resetChartvalues();
		this.filterChartData();
	}

	filterChartData() {
		this.dataUtil.filterChartData(this.dateForm, this.cases, this.chartLabels, this.chartData);
		this.graphicService.updateChart({ data: this.chartData, label: this.chartLabels });
	}

	resetChartvalues() {
		this.chartData[0].data = [];
		this.chartData[1].data = [];
		this.chartLabels = [];
	}
}
