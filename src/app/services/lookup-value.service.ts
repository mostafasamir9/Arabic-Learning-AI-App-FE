import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookupValue } from '../models/lookup-value.model';

@Injectable({
  providedIn: 'root'
})
export class LookupValueService {
  private apiUrl = 'http://localhost:8080/api/lookup-values'; // Assuming your backend runs on localhost:8080

  constructor(private http: HttpClient) { }

  getLookupValuesByCode(lookupCode: string): Observable<LookupValue[]> {
    return this.http.get<LookupValue[]>(`${this.apiUrl}/code/${lookupCode}`);
  }
}