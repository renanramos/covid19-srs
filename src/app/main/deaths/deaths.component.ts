import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { tap } from 'rxjs/operators';
import { DateForm } from 'src/app/model/date-form';
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

	dateForm!: DateForm;

	constructor(
		private dataUtil: DataUtil,
		private dataService: DataService,
		private graphicService: GraphicsService
	) {}

	async ngOnInit() {
		await this.getDeathsData();
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
		};

		await this.dataService
			.getDeathsData()
			.pipe(tap(receivedDeathsData))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	async dateChanged(dateForm: DateForm) {
		this.dateForm = dateForm;
		await this.getDeathsData();
		this.resetChartvalues();
		this.filterChartData();
	}

	filterChartData() {
		this.dataUtil.filterChartData(this.dateForm, this.deaths, this.chartLabels, this.chartData);
		this.graphicService.updateChart({ data: this.chartData, label: this.chartLabels });
	}

	resetChartvalues() {
		this.chartData[0].data = [];
		this.chartData[1].data = [];
		this.chartLabels = [];
	}
}
