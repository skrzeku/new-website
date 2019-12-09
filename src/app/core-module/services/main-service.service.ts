import {Inject, Injectable} from '@angular/core';
import {Subject} from "rxjs/index";
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  leftnavi$ = new Subject<boolean>();

  constructor(@Inject(DOCUMENT) private doc) { }


  ShareLeftNavi(bool: boolean) :void {
    this.leftnavi$.next(bool);
    console.log(bool);
  }
  createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
  }
}
