import {Component, Inject, Input, OnInit} from '@angular/core';
import {Project} from "../../core-module/model/project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.less']
})
export class ProjectDetailsComponent implements OnInit {

   project: Project;

  constructor(private dialogref: MatDialogRef<ProjectDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Project ) {
    this.project = data;
  }

  ngOnInit() {
  }

}
