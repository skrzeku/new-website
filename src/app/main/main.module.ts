import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import {CoreModuleModule} from "../core-module/core-module.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";

@NgModule({
  imports: [
    CommonModule,
    CoreModuleModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [ ContentComponent],
  exports: [ContentComponent]
})
export class MainModule { }
