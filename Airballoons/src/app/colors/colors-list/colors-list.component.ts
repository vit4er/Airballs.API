import {Component, OnInit} from '@angular/core';
import {Color} from '../../interfaces/color';
import {ColorsService} from './colors.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.css']
})
export class ColorsListComponent implements OnInit {
  colors: Color[] = [];
  selectedColor: string;

  constructor(
    private service: ColorsService,
    private router: Router) {
  }

  ngOnInit() {
    this.getColors();
  }

  getColors() {
    this.service.getAllColors().subscribe((data) => {
      data.forEach((item) => {
        this.colors.push(item);
      });
    });
  }

  addColor() {
    this.router.navigate(['color-form']);
  }

  deleteColor(event: any) {
    this.service.delColor(this.selectedColor).subscribe(res => {
      this.getColors();
    });
  }

  colorItemClicked(event: any, value) {
    if (event.target.classList.contains('active') && this.selectedColor === value) {
      event.target.classList.remove('active');
      this.selectedColor = '';
    } else {
      this.selectedColor = value;
    }
  }
}
