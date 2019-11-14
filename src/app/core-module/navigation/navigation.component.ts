import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MainServiceService} from "../services/main-service.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {
  fixedboolean: boolean = false;
  left_navi_boolean: boolean;
  navi_bool: boolean = false;
  @Output() small_navi_out = new EventEmitter();

  constructor(private mainservice: MainServiceService) { }

  ngOnInit() {
  }
  ScrollToElement(id) {
    const elements = document.querySelector(id) as Element;
    elements.scrollIntoView({ block: 'end',  behavior: 'smooth' });
  }
  show_small_navi() {
    this.navi_bool = !this.navi_bool;
    //this.mainservice.ShareLeftNavi(true);
    this.small_navi_out.emit(this.navi_bool);
  }

}
