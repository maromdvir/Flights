import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from 'src/app/shared/models/flight.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() colData: { field: string, header: string }[];
  @Input() gridData: any[];
  @Output() onRowClick: EventEmitter<any> = new EventEmitter();

  selectedRow: any;

  constructor() { }

  ngOnInit(): void {
    this.selectedRow = this.gridData[0];
  }

  onRowClicked($event: Flight): void{
    this.selectedRow = $event;
    this.onRowClick.emit($event);
  }

}


