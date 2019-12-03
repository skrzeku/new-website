import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../core-module/model/project.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.less']
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {

   project: Project;
   @ViewChild('gray_hover') gray_hover: ElementRef;

  constructor(private dialogref: MatDialogRef<ProjectDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Project ) {
    this.project = data;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    this.changeGrayText();
  }

  changeGrayText(): void {
    const all_imgs = document.querySelectorAll('#right_icons_wrapper img');
    const arrayimgs = Array.from(all_imgs);
    const grayelement = this.gray_hover.nativeElement;

    arrayimgs.forEach((el)=> {
      el.addEventListener('click', ()=> {
      const alt = el.getAttribute('alt');
      grayelement.innerText = alt;
      });
    });
  }
  close() {
    this.dialogref.close();
  }
  gotoDeploy() {
  window.open(this.project.deploy_url);
  }
  goToGit() {
    window.open(this.project.gitUrl);
  }
/*
  @HostListener('document:click', ['$event'])
  CheckClickOutside(event) {
    let targetElement = event.target as Element;
    if (!targetElement.matches('#right_icons_wrapper img')) {
      targetElement = targetElement.closest('#right_icons_wrapper img') as Element;
    }
    if (targetElement) {
      console.log(targetElement);
    }
    else {
      console.log(targetElement);
    }
  }
  */

}
