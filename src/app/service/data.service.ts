import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cases } from '../model/cases';
import { Deaths } from '../model/deaths';

@Injectable()
export class DataService {
	private jsonCasesUrl: string = `./../../${environment.casesFilePath}`;
	private jsonDeathsUrl: string = `./../../${environment.deathsFilePath}`;

	constructor(private http: HttpClient) {}

	public getCases(): Observable<Cases[]> {
		return this.http.get<Cases[]>(this.jsonCasesUrl);
	}

	public getDeathsData(): Observable<Deaths[]> {
		return this.http.get<Deaths[]>(this.jsonDeathsUrl);
	}
}
