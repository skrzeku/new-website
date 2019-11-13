import { Injectable } from '@angular/core';
import {Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  leftnavi$ = new Subject<boolean>();

  constructor() { }


  ShareLeftNavi(bool: boolean) :void {
    this.leftnavi$.next(bool);
    console.log(bool);
  }
}
