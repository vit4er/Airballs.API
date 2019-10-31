import {Component, OnInit} from '@angular/core';
import {Color} from '../../../interfaces/color';
import {ColorsService} from '../colors.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-color-form',
  templateUrl: './color-form.component.html',
  styleUrls: ['./color-form.component.css']
})
export class ColorFormComponent implements OnInit {
  newColor: Color = new Color();
  submitted = false;

  formColor: FormGroup;

  constructor(
    private colorsService: ColorsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formColor = new FormGroup({
      code: new FormControl('', [
        Validators.required
      ]),
      name: new FormControl('', [
        Validators.required
      ])
    });
  }

  formSubmit() {
    if (this.formColor.valid) {
      this.colorsService.addColor(this.formColor.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  exitForm() {
    this.router.navigate(['colors-list']);
  }

  newColorSelected(event: any) {
    this.formColor.controls.code.setValue(event.target.value.toUpperCase());
  }
}
