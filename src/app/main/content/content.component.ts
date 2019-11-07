import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, animateChild, group, query, state, style, transition, trigger} from "@angular/animations";
import {element} from "@angular/core/src/render3/instructions";
import {Project} from "../../core-module/model/project.model";
import {NavigationComponent} from "../../core-module/navigation/navigation.component";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  animations: [
    trigger('Animatepercents', [
      state('hide', style({
        width: '100px'
      })),
      state('show', style({
        width: '*'
      })),
      transition('hide => show', animate('1100ms ease-in'))
    ])
  ]
})
export class ContentComponent implements OnInit, AfterViewInit{
  @ViewChild('col12heared') col12heared: ElementRef;
  @ViewChild('navigation') navigation: NavigationComponent;
  @ViewChild('about_section') about_section: ElementRef;
  about_position: number;
  name = '';
  email = '';
  content = '';

  state = 'hide';
  projects: Project[] = [ {
    id: 1,
    img_url: '../../../assets/images/furni.png',
    language: 'HTML',
    name: 'First WebSite',
    description: 'Aplikacja meblowa jak ją nazwałem, była moją pierwszą aplikacją wykonaną przy wykorzystaniu języka JavaScript oraz biblioteki JQuery.' +
    'Aplikacja ta służyłą prostej wizualizacji elementów meblowych i skomponowanie mini kuchni.',
    tools: 'HTML5, CSS3, JavaScript, JQuery, Bootstrap',
    gitUrl: 'https://github.com/skrzeku/furniture_app'
  },
    {
      id: 2,
      img_url: '../../../assets/images/site.png',
      language: 'HTML',
      name: 'First WebSite',
      description: 'Moja pierwsza strona internetowa, która była kolejnym etapem poznawania technologii front-endowych.',
      tools: 'HTML5, CSS3, JavaScript, JQuery, Bootstrap',
      gitUrl: 'https://github.com/skrzeku/Site'
    },
    {
      id: 3,
      img_url: '../../../assets/images/smallsho.png',
      language: 'Angular',
      name: 'Small Shop',
      description: 'Moja pierwsza aplikacja typu SPA. W 100% wymyślona i zrobiona przeze mnie. Wzorowałem się tutaj na aplikacji olx.pl. Aplikacja ta pozwala dodawać, edytować produkty dla zarejestrowanych użytkowników. W pełni również został zrobiony ' +
      'system logowania. Wszystko to dzięki aplikacji Rest API do której tworzenia wykorzystałem framework Loopback',
      tools: 'TypeScript, Angular v4, Rest API, Loopback, HTML5, LESS, Bootstrap',
      gitUrl: 'https://github.com/skrzeku/SmallShop'
    },
    {
      id: 4,
      img_url: '../../../assets/images/portfolio.png',
      language: 'Angular',
      name: 'Current WebSite',
      description: 'Moja obecna strona internetowa. Jest to aplkiacja typu SPA. Była to moja druga aplikacja w której wykorzystałem nowoczesny framework Javascript - Angular.',
      tools: 'TypeScript, Angular v6, HTML5, SCSS, Bootstrap, Node.js',
      gitUrl: 'https://github.com/skrzeku/portfolio'
    },
    {
      id: 5,
      img_url: '../../../assets/images/auto-center.png',
      language: 'Angular',
      name: 'Auto-center',
      description: 'Mój trzeci projekt aplikacji typu SPA (Single Page Application) wykonana przy użyciu Angular 6 oraz technologii backend Google Firebase. ' +
      'Stylując tą aplikację wzorowałem się na aplikacji otomoto.pl. Nad tą aplikacją stale pracuje. W finalnej wersji znajdować się bedzie pełny system logowania, ' +
      'zaawansowany routing z nałożonymi Guardami. Możliwość dodawania, edytowania, usuwania pojazdów, oraz automatyczne usuwanie pojazdów po upływie określonego czasu. ' +
      'Obecna opublikowana wersja: https://skrzeku.github.io',
      tools: 'TypeScript, Angular v6, HTML5, Less, Node.js, Google Firebase, Angular Material',
      gitUrl: 'https://github.com/skrzeku/Auto-Center'
    },
    {
      id: 7,
      img_url: '../../../assets/images/domekon2.png',
      language: 'Java',
      name: 'domekon.pl',
      description: 'Ten projekt nie jest mojego autorstwa, jeden z klientów zgłosił się do mnie w celu wprowadzenia poprawek stylistycznych, klilku funkcjonalności przy użyciu JS oraz poprawienie aplikacji względem SEO. ' +
      'Dla mnie było to cenne doświadczenie w pracy z nową technologią jaką jest Wordpress.',
      tools: 'Wordpress, CSS, HTML5, PHP',
      gitUrl: 'http://domekon.pl'
    }];


  constructor(private render: Renderer2) { }

  ngOnInit() {}
  ngAfterViewInit() {
    this.about_position = this.about_section.nativeElement.getBoundingClientRect().top;


  }
  runpercents() {
    this.state = 'show';
    this.navigation.fixedboolean = true;
    console.log(this.navigation.fixedboolean);
  }

  @HostListener('window:scroll', ['$event'])
  CheckScroll() {
    const elementPosition = this.col12heared.nativeElement.offsetTop;
    const CurrenScrollPosition = window.pageYOffset;

    if (CurrenScrollPosition >= elementPosition - 300) {
      this.state = 'show';
    }
    if (CurrenScrollPosition <= elementPosition - 300) {
      this.state = 'hide';
    }
    if (CurrenScrollPosition >= this.about_position) {
      this.navigation.fixedboolean = true;
    }
    if (CurrenScrollPosition <= this.about_position) {
      this.navigation.fixedboolean = false;
    }
    else {
      return;
    }
  }

}
