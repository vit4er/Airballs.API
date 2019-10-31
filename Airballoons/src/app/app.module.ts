import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirballoonsComponent } from './airballoons/airballoons.component';
import { HeaderComponent } from './header/header.component';
import { ColorsComponent } from './colors/colors.component';
import { ColorsListComponent } from './colors/colors-list/colors-list.component';
import {ColorsService} from './colors/colors-list/colors.service';
import {HttpClientModule} from '@angular/common/http';
import { ColorFormComponent } from './colors/colors-list/color-form/color-form.component';
import { BalloonsListComponent } from './airballoons/balloons-list/balloons-list.component';
import { BalloonFormComponent } from './airballoons/balloons-list/balloon-form/balloon-form.component';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataGridModule} from 'primeng/datagrid';
import {PaginatorModule} from 'primeng/paginator';
import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import {ColorPickerModule} from 'primeng/colorpicker';
import { ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    AirballoonsComponent,
    HeaderComponent,
    ColorsComponent,
    ColorsListComponent,
    ColorFormComponent,
    BalloonsListComponent,
    BalloonFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    NgSelectModule,
    DataGridModule,
    PaginatorModule,
    MultiSelectModule,
    ButtonModule,
    ColorPickerModule,
    ListboxModule
  ],
  providers: [
    ColorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
