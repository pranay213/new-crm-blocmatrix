import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { CountryPickerService } from '../country-picker.service';
import { TableModule } from 'primeng/table';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule } from 'angular-calendar';
import { DialogModule } from 'primeng/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  standalone: true,
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  imports: [
    TableModule,
    NgFor,
    TabViewModule,
    CardModule,
    NgIf,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    CommonModule,
    ButtonModule,
    TablerIconsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CalendarModule,
    DialogModule,
    MatCheckboxModule,
  ],
})
export class GamesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  datamessage: string;
  choosenOption: any = 'ALL';
  games: any = [];
  displayDialog: boolean = false;
  cols: any = [
    { header: 'Name', field: 'display_name', width: '10%' },
    { header: 'Provider Name', field: 'game_provider_name', width: '10%' },
    { header: 'Reference Code', field: 'reference_code', width: '10%' },
    { header: 'Active', field: 'active', width: '10%' },
    // { header: "Action", field: "action", width: "10%" }
  ];
  totalRecords: any;
  loading: boolean;
  limit: any = 50;
  selectedGames: any = [];
  allSelected: any = false;
  showActionBox: any = false;
  actionType = 'Action';
  constructor(
    private apiService: ApiService,
    private route: Router,
    private countryPicker: CountryPickerService
  ) {}

  ngOnInit() {
    this.showActionBox = false;
    this.loadRowAccordingPegination(null);
  }

  onAction(game: any) {
    game.isEditable = true;
  }

  changeStatus() {
    if (this.actionType != 'Action') {
      console.log(this.actionType);
      this.selectedGames.forEach((value: any, index: any) => {
        let updatedData = {
          id: value.id,
          active: this.actionType,
        };
        this.apiService.updateGameStatus(updatedData).subscribe(
          (games: any) => {
            this.games.forEach((obj: any, i: any) => {
              if (obj.id === value.id) {
                console.log(obj);
                obj.active = this.actionType;
                return obj;
              }
            });
          },
          (error) => {
            this.route.navigate(['/games']);
          }
        );
      });
    }
    // let updatedData = {
    //     id: rowData.id,
    //     active: rowData.active
    // }
    // this.apiService.updateGameStatus(updatedData).subscribe((games: any) => {
    //     rowData.isEditable = false;
    //     alert("The request has been processed successfully");
    // }, error => {
    //   this.route.navigate(['/games']);
    // });
    // rowData.isEditable = false;
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  onRowSelect(event: any) {
    let flag = false;
    this.selectedGames.forEach((value: any, index: any) => {
      if (value.id === event.data.id) {
        flag = true;
      }
    });
    if (!flag) {
      this.selectedGames.push(event.data);
    }
    console.log(this.selectedGames.length);
    this.showActionBox = this.selectedGames.length <= 0 ? false : true;
    console.log(this.selectedGames);
    this.displayDialog = true;
    this.datamessage = '';
  }

  onRowUnselect(event: any) {
    this.selectedGames.forEach((value: any, index: any) => {
      if (value.id === event.data.id) {
        this.selectedGames.splice(index, 1);
      }
    });
    console.log(this.selectedGames.length);
    this.showActionBox = this.selectedGames.length <= 0 ? false : true;
    console.log(this.selectedGames);
  }

  selectAll(selected: any) {
    console.log(selected);
    if (selected) {
      this.selectedGames = [...this.games];
    } else {
      this.selectedGames = [];
    }
    this.allSelected = selected;
    console.log(this.selectedGames.length);
    this.showActionBox = this.selectedGames.length <= 0 ? false : true;
    console.log(this.selectedGames);
  }

  changeData(event: any) {
    console.log(event);
  }

  close() {
    this.displayDialog = false;
  }

  loadRowAccordingPegination(paginationValue: any) {
    this.loading = true;
    console.log(paginationValue);
    var page;
    var limit;
    if (paginationValue == null) {
      page = 1;
      limit = 50;
    } else {
      page = paginationValue.first / paginationValue.rows + 1;
      limit = paginationValue.rows;
    }
    let games: any;
    this.apiService
      .getGameByPegination(page, limit)
      .subscribe((allGames: any) => {
        this.loading = false;
        games = allGames.all_games;
        this.totalRecords = allGames.total_records;
        games.forEach((value: any, index: any) => {
          games[index]['isEditable'] = false;
        });
        this.games = games;
      });
  }
  showFilter() {
    console.log('show filter');
  }
}
