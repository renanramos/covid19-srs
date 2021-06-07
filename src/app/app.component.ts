import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'srs-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'COVID19-SRS';

	constructor() {}

	ngOnInit(): void {}
}
