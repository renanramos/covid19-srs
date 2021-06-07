import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Graphic } from '../../model/graphic';

@Injectable({
	providedIn: 'root'
})
export class GraphicsService {
	graphicDataSubject: Subject<Graphic> = new Subject();
	graphicDataSubject$ = this.graphicDataSubject.asObservable();

	constructor() {}

	updateChart(graphic: Graphic) {
		this.graphicDataSubject.next(graphic);
	}
}
