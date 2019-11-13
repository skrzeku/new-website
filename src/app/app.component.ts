import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MainServiceService} from "./core-module/services/main-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  leftnaviBoolean: boolean = false;


  constructor(private mainservice: MainServiceService) {}

  ngAfterViewInit () {
    this.mainservice.leftnavi$.subscribe((val) => {
      this.leftnaviBoolean = val;
    });
  }


}
