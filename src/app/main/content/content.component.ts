import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Project} from "../../core-module/model/project.model";
import {NavigationComponent} from "../../core-module/navigation/navigation.component";
import * as $ from 'jquery';



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
      transition('hide <=> show', animate('1100ms ease-in')),
    ])
  ]
})
export class ContentComponent implements OnInit, AfterViewInit{
  @ViewChild('col12heared') col12heared: ElementRef;
  @ViewChild('navigation') navigation: NavigationComponent;
  @ViewChild('about_section') about_section: ElementRef;
  @ViewChild('portfolio') portfolio: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  @ViewChild('abilities') abilities: ElementRef;
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
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



  BallElement;

  private ctx: CanvasRenderingContext2D;

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

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    //this.anotherAnimate();

  }
  ngAfterViewInit() {
    this.about_position = this.about_section.nativeElement.getBoundingClientRect().top;
    this.portfolio_position = this.portfolio.nativeElement.getBoundingClientRect().top;
    this.contact_position = this.contact.nativeElement.getBoundingClientRect().top;
    this.abilities_position = this.abilities.nativeElement.getBoundingClientRect().top;
    this.BallElement = {
      x1: 100,
      y: 100,
      vx: 5,
      vy: 2,
      radius: 25,
      color: 'blue',
      draw: ()=> function () {

      }
    };
  }

  @HostListener('window:scroll', ['$event'])
  CheckScroll() {

    const CurrenScrollPosition = window.pageYOffset;
    this.CheckBoolean();
    this.CheckSkills();

    if (CurrenScrollPosition >= this.abilities_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(1);
      this.skill_header_boolean = true;
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
    }

  }

  CheckBoolean() {
    const ScrollPosition = window.pageYOffset;
    if (ScrollPosition >= this.about_position - 2) {
      this.navigation.fixedboolean = true;
      this.RemoveClassActive();
      this.AddClassActive(0);
      this.about_header_boolean = true;
    }
    if (ScrollPosition <= this.about_position - 2) {
      this.navigation.fixedboolean = false;
    }
  }
  CheckSkills () {
    const scrollposition = window.pageYOffset;
    const elementPosition = this.col12heared.nativeElement.offsetTop;

    if (scrollposition >= elementPosition - 300) {
      this.state = 'show';
    }
    if (scrollposition <= elementPosition - 300 || scrollposition >= this.portfolio_position) {
      this.state = 'hide';
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
    const elements = document.querySelector(id) as Element;
    elements.scrollIntoView({ block: 'end',  behavior: 'smooth' });
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
    this.spansboolean = true;
    this.contact_header_boolean = true;
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



  /*
  SendMail(): void {
    const data = {
      service_id: 'skrzekugmail',
      template_id: 'mytemplate',
      user_id: 'user_7IplmzdpkPdh019K7I4Ey',
      template_params: {
        subject: this.emailform.controls['subject'].value,
        text: this.emailform.controls['email'].value,
        from_email: this.emailform.controls['Body'].value
      }
    };

    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(function() {
      console.log('Your mail is sent!');
    }).fail(function(error) {
      alert('Oops... ' + JSON.stringify(error));
    });
  }

  */

}
