import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worker } from '../../models/worker.model';
import { Flight } from '../../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  constructor(private http: HttpClient) { }

  getWorkers(query: string): Observable<Worker[]>{
    return this.http.get<Worker[]>(query);
  }

  getFlights(query: string): Observable<Flight[]>{
    return this.http.get<Flight[]>(query);
  }

}
