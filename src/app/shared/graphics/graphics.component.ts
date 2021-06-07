import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ConstantValues } from 'src/app/model/constants';
import { Graphic } from 'src/app/model/graphic';
import { GraphicsService } from '../service/graphics.service';

@Component({
	selector: 'srs-graphics',
	templateUrl: './graphics.component.html',
	styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
	chartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false
	};

	lineChartType: string = 'line';

	chartLabels: Label[] = [];
	chartData: ChartDataSets[] = [];
	chartTotalCaseData: ChartDataSets[] = [
		{
			type: 'line',
			data: []
		}
	];

	graphicSubscription!: Subscription;

	constructor(private graphicService: GraphicsService) {}

	async ngOnInit() {
		await this.subscribeToGraphic();
	}

	async subscribeToGraphic() {
		this.graphicSubscription = this.graphicService.graphicDataSubject$.subscribe(
			(graphic: Graphic) => {
				this.chartLabels = graphic.label;
				this.chartData = graphic.data.slice(1, 3);
				this.setDeathsGraphic(graphic);
			}
		);
	}
	setDeathsGraphic(graphic: Graphic) {
		this.chartTotalCaseData[ConstantValues.TOTAL_INDEX] = graphic.data[ConstantValues.TOTAL_INDEX];
		this.chartTotalCaseData[ConstantValues.TOTAL_INDEX].type = 'line';
		this.chartTotalCaseData[ConstantValues.TOTAL_INDEX].borderColor = '#FFA500';
	}
}
