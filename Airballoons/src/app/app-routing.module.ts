import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AirballoonsComponent} from './airballoons/airballoons.component';
import {ColorsComponent} from './colors/colors.component';
import {ColorFormComponent} from './colors/colors-list/color-form/color-form.component';
import {BalloonsListComponent} from './airballoons/balloons-list/balloons-list.component';
import {BalloonFormComponent} from './airballoons/balloons-list/balloon-form/balloon-form.component';
import {ColorsListComponent} from './colors/colors-list/colors-list.component';


const routes: Routes = [
  {path: '', component: AirballoonsComponent},
  {path: 'airballoons', component: AirballoonsComponent},
  {path: 'colors', component: ColorsComponent},
  {path: 'colors-list', component: ColorsListComponent},
  {path: 'color-form', component: ColorFormComponent},
  {path: 'balloons-list', component: BalloonsListComponent},
  {path: 'balloon-form', component: BalloonFormComponent},
  {path: 'balloon-form/:id', component: BalloonFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
