import { Component, OnInit } from '@angular/core';
import {MainServiceService} from "../services/main-service.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  fixedboolean: boolean = false;
  left_navi_boolean: boolean;

  constructor(private mainservice: MainServiceService) { }

  ngOnInit() {
  }
  ScrollToElement(id) {
    const elements = document.querySelector(id) as Element;
    elements.scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }
  left_navi_show() {
    this.mainservice.ShareLeftNavi(true);
  }

}
