import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, keyframes, query, sequence, stagger, state, style, transition, trigger} from "@angular/animations";
import {Project} from "../../core-module/model/project.model";
import {NavigationComponent} from "../../core-module/navigation/navigation.component";
import * as $ from 'jquery';
import {MatDialog, MatSnackBar} from "@angular/material";
import {Filter} from "../../core-module/pipes/filter.model";
import {ProjectDetails} from "@angular/cli/utilities/project";
import {ProjectDetailsComponent} from "../project-details/project-details.component";




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
      transition('hide => show', animate('1100ms linear')),
    ]),

    trigger('hide_projects', [
      transition('* => void', [
        style({ opacity: '1', transform: 'scale3d(1, 1, 1)'}),
          animate("0.5s ease-out", style({  opacity: 0, transform: 'scale3d(0.2, 0.2, 0.2)'  }))

      ]),
        /*
        transition('void => *', [
          style({ opacity: '0', transform: 'scale3d(0.2, 0.2, 0.2)' }),
            animate("0.7s ease-in", style({  opacity: 1, transform: 'scale3d(1, 1, 1)' }))
          ])
          */
        ]),

/*
  trigger('stagger_animation', [
    transition('* <=> *', [
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger(
            '50ms',
            animate(
              '1000ms ease-out',
              style({ opacity: 1, transform: 'translateY(0px)' })
            )
          )
        ],
        { optional: true }
      ),
      query(':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
      })
    ])

    ])
  */]

})
export class ContentComponent implements OnInit, AfterViewInit{
  @ViewChild('col12heared') col12heared: ElementRef;
  @ViewChild('navigation') navigation: NavigationComponent;
  @ViewChild('about_section') about_section: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  @ViewChild('abilities') abilities: ElementRef;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('collapse') collapse: ElementRef;
  @ViewChild('first_filter') first_filter: ElementRef;
  about_position: number;
  portfolio_position: number;
  contact_position: number;
  abilities_position: number;
  name = '';
  email = '';
  content = '';
  x: number = 0;
  spansboolean: boolean = false;
  contact_header_boolean: boolean = false;
  portfolio_header_boolean: boolean = false;
  skill_header_boolean: boolean = false;
  about_header_boolean: boolean = false;
  small_navi_bool: boolean = false;
  project_hover_bool: boolean = false;
  project_show_bool: boolean = false;
  mylo: number;
  newinterval;






  BallElement;

  private ctx: CanvasRenderingContext2D;

  state = 'hide';
  projects: Project[] = [ {
    id: 1,
    img_url: '../../../assets/images/furni.png',
    language: 'JavaScript',
    name: 'Furniture_App',
    description: 'Aplikacja meblowa jak ją nazwałem, była moją pierwszą aplikacją wykonaną przy wykorzystaniu języka JavaScript oraz biblioteki JQuery.' +
    'Aplikacja ta służyłą prostej wizualizacji elementów meblowych i skomponowanie mini kuchni.',
    tools: 'HTML5, CSS3, JavaScript, JQuery, Bootstrap',
    gitUrl: 'https://github.com/skrzeku/furniture_app'
  },
    {
      id: 2,
      img_url: '../../../assets/images/site.png',
      language: 'JavaScript',
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
      language: 'Wordpress',
      name: 'domekon.pl',
      description: 'Ten projekt nie jest mojego autorstwa, jeden z klientów zgłosił się do mnie w celu wprowadzenia poprawek stylistycznych, klilku funkcjonalności przy użyciu JS oraz poprawienie aplikacji względem SEO. ' +
      'Dla mnie było to cenne doświadczenie w pracy z nową technologią jaką jest Wordpress.',
      tools: 'Wordpress, CSS, HTML5, PHP',
      gitUrl: 'http://domekon.pl'
    }];
        //To flter of projects at the begin of component projects.length should be equal to 0
  filters: Filter[] = [];


  constructor(private render: Renderer2,
              private snack: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');


    //this.anotherAnimate();

  }
  ngAfterViewInit() {
    this.about_position = this.about_section.nativeElement.getBoundingClientRect().top;
    this.portfolio_position = this.portfolio.nativeElement.getBoundingClientRect().top;
    this.contact_position = this.contact.nativeElement.getBoundingClientRect().top;
    this.abilities_position = this.abilities.nativeElement.getBoundingClientRect().top;
    console.log(this.childnavi);
    this.SetDefaultPosition();


    this.BallElement = {
      x1: 100,
      y: 100,
      vx: 5,
      vy: 2,
      radius: 25,
      color: 'blue',

    };
  }

  @HostListener('window:scroll', ['$event'])
  CheckScroll() {

    const CurrenScrollPosition = window.pageYOffset;
    this.CheckBoolean();
    this.CheckSkills();
    if (CurrenScrollPosition >= this.about_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(0);
      this.about_header_boolean = true;
    }

    if (CurrenScrollPosition >= this.abilities_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(1);
      this.skill_header_boolean = true;
      this.state = 'show';
      this.getpercentWidth();


    }
    if (CurrenScrollPosition >= this.portfolio_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(2);
      this.portfolio_header_boolean = true;

    }
    if (CurrenScrollPosition >= this.contact_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(3);
      this.contact_header_boolean = true;
      this.spansboolean = true;
    }
  }
          //navi should be absolute for the smallest devices
  CheckWidth() {
    if (window.innerWidth < 992) {
      this.navigation.fixedboolean = false;
    }
    else this.navigation.fixedboolean = true;
  }

  CheckBoolean() {
    const ScrollPosition = window.pageYOffset;
    if (ScrollPosition >= this.about_position - 2) {
      this.navigation.fixedboolean = true;

    }
    if (ScrollPosition <= this.about_position - 2) {
      this.navigation.fixedboolean = false;
    }
  }
  CheckSkills () {
    const scrollposition = window.pageYOffset;
    const elementPosition = this.col12heared.nativeElement.offsetTop;

    if (scrollposition >= elementPosition - 300) {


    }
    if (scrollposition <= elementPosition - 300 || scrollposition >= this.portfolio_position) {
      return;
    }
  }
  private AddClassActive (numb: number): void {
    const siema = document.querySelectorAll('.navigate').item(numb);
    siema.classList.add('active_navi');
  }
  private RemoveClassActive (): void {
    for (let s = 0; s < 4; s++) {
      const siema = document.querySelectorAll('.navigate').item(s);
      siema.classList.remove('active_navi');
    }
  }
  ScrollToElement(id) {
    const collapse_element = this.collapse.nativeElement;
    const elements = document.querySelector(id) as Element;
    elements.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    this.render.removeClass(collapse_element, 'show');

  }
  childnavi(event) {
    this.small_navi_bool = event;
  }

  canvasAnimate() {
    this.ctx.beginPath();
    this.ctx.moveTo(20, 20); //stawiamy piórko w punkcie x: 20 y: 20
    this.ctx.lineTo(30, 40); //zaczynamy rysować niewidzialną linię do x : 30, y: 40
    this.ctx.lineTo(35, 10); //kolejna linia
    this.ctx.lineTo(125, 30); //i kolejna
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(20, 20);
    this.ctx.lineTo(125, 30);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(80, 70);
    this.ctx.lineTo(205, 40);
    this.ctx.stroke();
  }

  anotherAnimate() {
    const i = setInterval(() => {
      this.ctx.beginPath();
      this.ctx.moveTo(500, 500);
      this.ctx.lineTo(155, 60);
      this.ctx.moveTo(100, 100);
      this.ctx.lineTo(30, 40);
      this.ctx.stroke();
    }, 800/15);
  }


  drawIt() {
    requestAnimationFrame(() => this.drawIt());
    this.ctx.clearRect(0,0, 300, 300);
    this.ctx.fillStyle = "red";
    if (this.x >= 300) {
      this.x = -90;
    }
    this.ctx.fillRect(this.x,50,80,100);
    this.x+=2;
  }

  rollIcons() {

    this.contact_header_boolean = true;
  }
  SetDefaultPosition() {
    const div_flow = document.querySelector('.active_filter');
    const pos = this.first_filter.nativeElement.offsetLeft;
    const wid = this.first_filter.nativeElement.width;
    this.render.setStyle(div_flow, 'left', pos + 'px');
    this.render.setStyle(div_flow, 'width', wid + 'px');

  }
  changefilter (event) {

        //to move colored div
    const el = event.target;
    const div_flow = document.querySelector('.active_filter');
    const off_left = el.offsetLeft;
    const target_width = el.clientWidth;
    const top = el.offsetTop;
    this.render.setStyle(div_flow, 'left', off_left + 'px');
    this.render.setStyle(div_flow, 'width', target_width + 'px');
    this.render.setStyle(div_flow, 'left', off_left + 'px');
    this.render.setStyle(div_flow, 'top', top + 'px');

      //to fill an array
   const attr = el.getAttribute('data-target');
   if (attr === 'all') {
     this.filters.length = 0;
   }
   else {
     this.filters.length = 0;
     this.filters.push({
       name: 'language',
       value: attr
     });
   }

  }
  openProjectDetails(project, e) {
    e.preventDefault();
    this.dialog.open(ProjectDetailsComponent, {data: project});

  }

  drawball () {
    requestAnimationFrame(()=> this.drawball());

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.ctx.beginPath();
    this.ctx.arc(this.BallElement.x1, this.BallElement.y, this.BallElement.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.BallElement.color;
    this.ctx.fill();
      this.BallElement.x1 += this.BallElement.vx;
      this.BallElement.y += this.BallElement.vy;
      this.BallElement.vy *= .99;
      this.BallElement.vy += .25;

      if (this.BallElement.y + this.BallElement.vy > this.canvas.nativeElement.height ||
        this.BallElement.y + this.BallElement.vy < 0) {
        this.BallElement.vy = -this.BallElement.vy;
      }
      if (this.BallElement.x1 + this.BallElement.vx > this.canvas.nativeElement.width ||
        this.BallElement.x1 + this.BallElement.vx < 0) {
        this.BallElement.vx = -this.BallElement.vx;
      }


  }


  onsucces(): void {
    this.snack.open('Email wysłany poprawnie');
  }
  getpercentWidth(): void {

    const back_el = document.querySelectorAll('li.progress-bar-striped');
    const all_spans = document.querySelectorAll('.percent_span');
    const el = document.querySelectorAll('li.progress-bar-striped div');


    const arrays = Array.from(el);

    let i = 0;
    let z = 0;
      let inter = setInterval(()=> {
        if (z >= 110) {
        clearInterval(inter);
        }
        z++;
        arrays.forEach((span, index)=> {
          all_spans[index].innerHTML = Math.round((span.clientWidth / back_el[index].clientWidth) * 100).toString() + ' %';
        });

      }, 10);




  }


  SendMail(): void {
    const data = {
      service_id: 'skrzekugmail',
      template_id: 'mytemplate',
      user_id: 'user_7IplmzdpkPdh019K7I4Ey',
      template_params: {
        subject: this.name,
        text: this.content,
        from_email: this.email
      }
    };


    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      this.onsucces();

    }).fail((error) => {
      alert('Oops... ' + JSON.stringify(error));
    });
  }



}
