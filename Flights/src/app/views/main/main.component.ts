import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightsService } from '../../shared/services/flights/flights.service'
import { Worker } from '../../shared/models/worker.model';
import { Flight } from '../../shared/models/flight.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { timer } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  selectedWorker: Worker;
  workers: Worker[];
  selectedWorkerFlights: Flight[];
  selectedWorkerFlight: {[key in keyof Flight]: any };
  isLoadingFlights: boolean;
  subscriptions: Subscription[] = [];



  flightsTableColData:{ field: string, header: string }[] = [
    { field: 'num', header: 'Flight Number' },
    { field: 'from', header: 'Origin' },
    { field: 'from_date', header: 'Origin Date' },
    { field: 'to', header: 'Destination' },
    { field: 'to_date', header: 'Destination Date' }
  ];

  flightMoreInfoColData: { field: string, header: string }[] = [
    { field: 'plane', header: 'Plane Number' },
    { field: 'stringDuration', header: 'Duration' },
    { field: 'from_gate', header: 'Origin Gate' },
    { field: 'to_gate', header: 'Destination gate' }
  ];

   
  constructor(private flights: FlightsService) { }


  ngOnInit(): void {
    this.subscriptions.push(this.flights.getWorkers()
      .subscribe((workers: Worker[]) => {
        ;this.workers = workers
        if(this.workers[0]){
          this.selectedWorker = this.workers[0];
          this.runGetFlightsInterval();
        }
      }, err => alert('workers error')
      ));
  }


  runGetFlightsInterval(): void {
    this.subscriptions.push(timer(0, 60000)   // start now and every 1 min
      .subscribe(() => {
        this.isLoadingFlights = true;
        this.subscriptions.push(
          this.flights.getFlights(this.selectedWorker.id)
            .subscribe((flights: Flight[]) => {
              this.selectedWorkerFlights = flights;
              if (this.selectedWorkerFlights[0]) {
                this.selectedWorkerFlight = this.selectedWorkerFlights[0];
                this.selectedWorkerFlight.stringDuration = this.flights.convertMinuts(this.selectedWorkerFlight.duration);
              }
              this.isLoadingFlights = false;
            }
              , err => alert('flights error')))
      })
    );
  }

  onWorkerSelected($event: Worker): void {
    this.selectedWorker = $event;
    this.isLoadingFlights = true;

    this.subscriptions.push(this.flights.getFlights(this.selectedWorker.id)
      .subscribe((flights: Flight[]) => {
        this.selectedWorkerFlights = flights;
        this.selectedWorkerFlight = this.selectedWorkerFlights[0];
        this.selectedWorkerFlight.stringDuration = this.flights.convertMinuts(this.selectedWorkerFlight.duration);
        this.isLoadingFlights = false;
      }
        , err => alert('flights error')
      )
    );
  }

  onFlightSelected($event: Flight): void {
    this.selectedWorkerFlight = $event;
    this.selectedWorkerFlight.stringDuration = this.flights.convertMinuts($event.duration);
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0) {
      this.subscriptions.forEach(((sub: Subscription) => sub.unsubscribe()));
    }
  }

}

