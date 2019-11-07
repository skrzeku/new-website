import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSnackBarModule, MatToolbarModule
} from "@angular/material";



const Materials = [
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSliderModule
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [...Materials],
  declarations: []
})
export class MaterialModule { }
