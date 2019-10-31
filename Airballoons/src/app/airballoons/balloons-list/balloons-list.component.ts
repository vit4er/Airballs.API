import {Component, OnInit, ViewChild} from '@angular/core';
import {AirballoonListItem} from '../../interfaces/airballoon';
import {ActivatedRoute, Router} from '@angular/router';
import {BalloonsService} from './balloons.service';
import {Table, TableModule} from 'primeng/table';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import {ColorsService} from '../../colors/colors-list/colors.service';
import {FilterUtils} from 'primeng/api';
import {isEmpty} from 'rxjs/operators';
import {equal} from 'assert';

@Component({
  selector: 'app-balloons-list',
  templateUrl: './balloons-list.component.html',
  styleUrls: ['./balloons-list.component.css']
})
export class BalloonsListComponent implements OnInit {
  balloons: AirballoonListItem[] = [];
  columns: any[];
  filterMetaData: any;
  multiSortMeta: any;
  selectedBalloon: AirballoonListItem;
  totalRecords = 0;
  first = 0;
  rows = 5;
  sort: string;
  sortDefault = JSON.stringify({Property: 'id', OrderDirection: '1', Range: 0});
  order: number;
  loading = true;
  colors: SelectItem[] = [];

  @ViewChild(TableModule, {static: false}) private balloonsTable: TableModule;

  constructor(private router: Router,
              private currentRoute: ActivatedRoute,
              private balloonsService: BalloonsService,
              private colorService: ColorsService) {
    // this.fetchData();
  }

  ngOnInit() {
    this.columns = [
      {field: 'id', header: '##'},
      {field: 'name', header: 'Наименование'},
      {field: 'description', header: 'Описание'},
      {field: 'color', header: 'Цвет'},
      {field: 'price', header: 'Цена'},
      {field: 'quantity', header: 'Кол-во, шт.'}
    ];
    this.colorService.getAllColors().subscribe((data) => {
      data.forEach((item) => {
        this.colors.push({
          label: item.name,
          value: item.code
        });
      });
    });
  }

  addBalloonClick() {
    this.router.navigate(['balloon-form']);
  }

  updBalloonClick() {
    const balloon = this.selectedBalloon;
    this.router.navigate(['balloon-form', balloon.id]);
  }

  delBalloonClick() {
    this.balloonsService.delBalloon(this.selectedBalloon.id).subscribe(
      () => {
        // this.fetchData();
      }
    );
  }

  lazyLoad(event: LazyLoadEvent) {
    this.loading = true;
    this.balloonsService.getBalloons(
      event.first,
      event.rows,
      JSON.stringify(event.multiSortMeta),
      JSON.stringify(event.filters)
    ).subscribe((resp) => {
      this.balloons = [];
      resp.body.query.forEach((item) => {
        this.balloons.push(item);
      });
      this.totalRecords = resp.body.total;
      this.loading = false;
    });
  }
}
