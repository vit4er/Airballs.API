import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Color} from '../../../interfaces/color';
import {ColorsService} from '../../../colors/colors-list/colors.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BalloonsService} from '../balloons.service';
import {NgSelectComponent} from '@ng-select/ng-select';
import {Airballoon} from '../../../interfaces/airballoon';

@Component({
  selector: 'app-balloon-form',
  templateUrl: './balloon-form.component.html',
  styleUrls: ['./balloon-form.component.css']
})
export class BalloonFormComponent implements OnInit {
  @Output() dataChanged: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild(NgSelectComponent, {static: false})
  private selectColor: NgSelectComponent;

  balloonForm: FormGroup;
  colors: Color[] = [];
  currentBalloon: Airballoon;

  constructor(
    private colorsService: ColorsService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private balloonService: BalloonsService
  ) {
    this.balloonForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('')
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      colorCode: new FormControl('', [
        Validators.required
      ]),
      price: new FormControl('0.00', [
        Validators.required
      ]),
      quantity: new FormControl('0', [
        Validators.required
      ])
    });

    this.colorsService.getAllColors().subscribe((data) => {
      data.forEach((item) => {
        this.colors.push(item);
      });
    });
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((data) => {
      const id = data.id;
      this.balloonService.getBalloon(id).subscribe((resp) => {
        this.currentBalloon = resp;
        this.balloonForm.get('name').patchValue(resp.name);
        this.balloonForm.get('description').patchValue(resp.description);
        this.balloonForm.get('colorCode').patchValue(resp.colorCode);
        this.balloonForm.get('price').patchValue(resp.price);
        this.balloonForm.get('quantity').patchValue(resp.quantity);
      });
    });
  }

  exitForm() {
    this.router.navigate(['airballoons']);
  }

  onSubmit() {
    if (this.balloonForm.valid) {
      /// TODO: запись
      if (this.currentBalloon === null || this.currentBalloon === undefined) {
        this.balloonService.addBalloon(this.balloonForm.value).subscribe((response) => {
            this.dataChanged.emit();
            this.router.navigate(['airballoons']);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        const currId = this.currentBalloon.id;
        this.currentBalloon = this.balloonForm.value;
        this.currentBalloon.id = currId;
        this.balloonService.updBalloon(this.currentBalloon.id, this.currentBalloon).subscribe((response) => {
            this.dataChanged.emit();
            this.router.navigate(['airballoons']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
