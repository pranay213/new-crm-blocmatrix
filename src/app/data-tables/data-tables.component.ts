import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MaterialModule } from '../material.module';
import { NgFor, NgIf } from '@angular/common';
import { AppDoughnutpieChartComponent } from '../pages/charts/doughnut-pie/doughnut-pie.component';
@Component({
  selector: 'app-data-tables',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MaterialModule,
    NgFor,
    AppDoughnutpieChartComponent,
    NgIf,
  ],
  templateUrl: './data-tables.component.html',
})
export class DataTablesComponent implements AfterViewInit {
  // table 4

  @Input() tableData: any;
  @Input() title: string;
  @Input() tablesHeadings: any;
  @Input() chart: boolean;
  @Input() piePoints: any;
  // chart: boolean = true;
  // @Input() topGamesData: any;
  selectedType = 'Table';

  selectedTypeFn = () => {
    if (this.selectedType === 'Table') {
      this.selectedType = 'Chart';
    } else {
      this.selectedType = 'Table';
    }
  };

  displayedColumns: string[] = [
    'Game Name',
    'Game Type',
    'Total Wagered',
    'Total Winnings',
    'Count of Players',
  ];
  monthsNames: any = [
    { value: 'Today', viewValue: 'Today' },
    { value: 'Yesterday', viewValue: 'Yesterday' },
    { value: 'This Week', viewValue: 'This Week' },
    { value: 'Last Week', viewValue: 'Last Week' },
    { value: 'This Month', viewValue: 'This Month' },
    { value: 'Last Month', viewValue: 'Last Month' },
  ];
  selectedValue = 'Today';
  setCategoryValue(event: any) {
    this.selectedValue = event.value;
    console.log(event.value);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
  }
  constructor() {
    console.log('piePoints', this.piePoints);
  }
}
