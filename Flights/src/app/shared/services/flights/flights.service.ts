import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Worker     } from '../../models/worker.model';
import { Flight     } from '../../models/flight.model';
import { NetService } from '../net/net.service'
@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private api: string = 'https://interview-mock.herokuapp.com/api/';

  constructor(private net: NetService) { }


  getWorkers(): Observable<Worker[]> {
    return this.net.getWorkers(`${this.api}workers`);
  }

  getFlights(workerId: number): Observable<Flight[]> {
    return this.net.getFlights(`${this.api}workers/${workerId}`);
  }

  convertMinuts(n: number): string {
    let num = n;
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return `${rhours}h ${num}m`;
    }

}
