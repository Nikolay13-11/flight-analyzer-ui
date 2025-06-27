import { Component, input } from '@angular/core';
import { Fare } from '../../../../models/fares.model';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-fares-table',
  imports: [TableModule, DatePipe],
  templateUrl: './fares-table.component.html',
  styleUrl: './fares-table.component.scss',
})
export class FaresTableComponent {
  fares = input.required<Fare[]>();
}
