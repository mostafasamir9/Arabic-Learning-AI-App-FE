import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupValue } from '../models/lookup-value.model';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class LookupValueService {
  private apiUrl = `${environment.apiUrl}/lookup-values`;

  constructor(private http: HttpClient) { }

  getLookupValuesByCode(lookupCode: string): Observable<LookupValue[]> {
    return this.http.get<LookupValue[]>(`${this.apiUrl}/code/${lookupCode}`);
  }
}