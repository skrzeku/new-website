import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MainModule} from "./main/main.module";
import {CoreModuleModule} from "./core-module/core-module.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material/material.module";
import {MainServiceService} from "./core-module/services/main-service.service";
import {FilterPipe} from "./core-module/pipes/filter.pipe";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    CoreModuleModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [MainServiceService, FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
