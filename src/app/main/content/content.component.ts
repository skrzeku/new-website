import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {animate, keyframes, query, sequence, stagger, state, style, transition, trigger} from "@angular/animations";
import {Project} from "../../core-module/model/project.model";
import {NavigationComponent} from "../../core-module/navigation/navigation.component";
import * as $ from 'jquery';
import {MatDialog, MatSnackBar} from "@angular/material";
import {Filter} from "../../core-module/pipes/filter.model";
import {ProjectDetails} from "@angular/cli/utilities/project";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import Typed from 'typed.js';
import {log} from 'util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';




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
  @ViewChild('errors') errors: ElementRef;
  about_position: number;
  portfolio_position: number;
  contact_position: number;
  abilities_position: number;
  x = 0;
  spansboolean = false;
  contact_header_boolean = false;
  portfolio_header_boolean = false;
  skill_header_boolean = false;
  about_header_boolean = false;
  small_navi_bool = false;
  project_hover_bool = false;
  project_show_bool = false;
  hobbyiconsshow = false;
  skillsiconsshow = false;
  form: FormGroup;
  error_text = 'hej';
  showsuccess = false;







  BallElement;

  private ctx: CanvasRenderingContext2D;

  state = 'hide';
  projects: Project[] = [
    {
      id: 7,
      img_url: '../../../assets/images/domekon_graphic2.png',
      language: 'Wordpress',
      name: 'domekon.pl',
      description: 'domekon.pl - sklep internetowy oferujący nowoczesne meble. Projekt ten nie jest w 100% mojego autorstwa. Początkowo aplikacja ta pisana była przez inną osobę, która ustawiła szablony aplikacji, podpięła do niej bazę danych. Moją rolą w tym projekcie było dostosowanie tej aplikacji do nowoczesnych wymagań oraz trendów. Wprowadziłem bardzo dużo poprawek stylistycznych przy użyciu CSS, kilka funkcjonalności w JavaScript oraz poprawiłem widoczność dostępnych grafik. Sprawiłem, że aplikacja jest w pełni dostosowana do wszystkich urządzeń mobilnych oraz wprowadziłem zmiany mające na celu poprawienie efektywności wyszukiwania strony w nowoczesnych wyszukiwarkach.',
      tools: 'Wordpress, CSS, HTML5, PHP, RWD, JavaScript, JQuery',
      deploy: true,
      deploy_url: 'http://domekon.pl',
      first_slide: 'domekon_slide1',
      sec_slide: 'domekon_slide2',
      third_slide: 'domekon_slide3'
    },
    {
      id: 5,
      img_url: '../../../assets/images/autocentermain.png',
      language: 'Angular',
      name: 'Auto-center',
      description: 'Mój trzeci projekt aplikacji typu SPA (Single Page Application) wykonana przy użyciu Angular 6 oraz technologii backend Google Firebase. Nad tą aplikacją stale pracuje. W finalnej wersji znajdować się będzie pełny system logowania/rejestracji, zaawansowany routing z nałożonymi Guardami. Możliwość dodawania, edytowania, usuwania pojazdów przez uprawnionych użytkowników. W aplikacji wprowadziłem również tzw. "lazy loading", aby przyspieszyć lądowanie stanu początkowego. Projekt będzie również w pełni responsywny oraz przygotowany do pozycjonowania. Aplikacje chciałbym również dostosować do wszystkich urządzeń mobilnych bez wykorzystania frameworka Bootstrap.',
      tools: 'TypeScript, Angular v6, HTML5, LESS, Node.js, Google Firebase, Angular Material, RWD',
      gitUrl: 'https://github.com/skrzeku/Auto-Center',
      deploy: true,
      deploy_url: 'https://skrzeku.github.io',
      first_slide: 'autocenterslide1',
      sec_slide: 'autocenterslide2',
      third_slide: 'autocenterslide3'

    },

    {
      id: 8,
      img_url: '../../../assets/images/portfoliomain.png',
      language: 'Angular',
      name: 'skrzeszewski.pl',
      description: "Moja obecna strona - Portfolio, w której ponownie wykorzystałem technologie Typescript oraz framework Angular v6. W stylowaniu aplikacji pomocne były zarówno elementy Bootstrap'a, jak i Angular Material oraz preprocesor LESS. W projekcie wykorzystałem więcej niż zwykle animacji przy pomocy LESS oraz Angulara. Użyłem również dekoratora @HostListener, który 'nasłuchuje' przewijanie strony i wprowadza poszczególne zmiany w animacjach. Formularz kontaktowy obsługuje serwis email.js. Filtrowanie projektów odbywa się przy pomocy własnego pipe. Strona jest w pełni responsywna i przygotowana do pozycjonowania w sieci.",
      tools: 'Angular, HTML5, LESS, Bootstrap, RWD, TypeScript',
      deploy: true,
      deploy_url: 'http://skrzeszewski.pl',
      first_slide: 'portfolioslide1',
      sec_slide: 'portfolioslide2',
      third_slide: 'portfolioslide3'
    },
    {
      id: 3,
      img_url: '../../../assets/images/smallshopmain.png',
      language: 'Angular',
      name: 'Small Shop',
      description: 'Moja pierwsza aplikacja typu SPA. W 100% wymyślona i zrobiona przeze mnie. Wzorowałem się tutaj na aplikacji olx.pl. Aplikacja umożliwia operacje na produktach takie jak: dodawanie ich, usuwanie z bazy danych, pobieranie informacji oraz edytowanie. Do wymienionych operacji dostęp mieli jedynie zalogowani użytkownicy. W Aplikacji zastosowałem routing umożliwiający dostęp do poszczególnych widoków oraz nałożyłem guardy, broniące dostępu do widoków przed niezalogowanymi użytkownikami. Do napisania Aplikacji Rest Api pomocny okazał się framework LoopBack.',
      tools: 'TypeScript, Angular v4, Rest API, Loopback, HTML5, LESS, Bootstrap, RWD',
      gitUrl: 'https://github.com/skrzeku/SmallShop',
      deploy: false,
      first_slide: 'smallshopslide1',
      sec_slide: 'smallshopslide2',
      third_slide: 'smallshopslide3'
    },
    {
      id: 4,
      img_url: '../../../assets/images/skrzeszewskiplmain.png',
      language: 'Angular',
      name: 'Current WebSite',
      description: "Moją poprzednią stronę stworzyłem w Typescript przy użyciu frameworka Angular. Na stronie wprowadziłem prosty routing bez konieczności wprowadzania guardow, Strony poszczególnych projektów zostały stworzone na bazie dynamicznych komponentów. Wysyłanie wiadomości było możliwe dzięki bibliotece email.js oraz technologi AJAX. Filtrowanie projektów zrobiłem przy pomocy stworzonego Pipe. Na stronie głównej wprowadziłem również dodatkową nawigację, której zmiany nasłuchiwałem dekoratorem @HostListener i która działała na zasadzie scroll'a. Aplikacja ta jest w 100% responsywna i przygotowana do pozycjonowania w sieci.",
      tools: 'TypeScript, Angular v6, HTML5, Sass, Bootstrap, Node.js, RWD',
      gitUrl: 'https://github.com/skrzeku/portfolio',
      deploy: true,
      deploy_url: 'http://skrzeszewski.pl',
      first_slide: 'currentslide1',
      sec_slide: 'currentslide2',
      third_slide: 'currentslide3'
    },
    {
    id: 1,
    img_url: '../../../assets/images/furnituremain.png',
    language: 'JavaScript',
    name: 'Furniture_App',
    description: 'Aplikacja meblowa jak ją nazwałem, była moją pierwszą aplikacją wykonaną przy wykorzystaniu języka JavaScript oraz biblioteki JQuery. ' +
      'Aplikacja ta służyła prostej wizualizacji elementów meblowych i skomponowanie mini kuchni. Należy wybrać wielkość obszaru roboczego, ' +
      'aby następnie móc dodawać poszczególne elementy górne lub dolne. Poszczególnego elementu nie można dodać, gdy po jego ' +
      'dodaniu przekroczy szerokość lub wysokość obszaru roboczego',
    tools: 'HTML5, CSS3, JavaScript, JQuery, Bootstrap',
    gitUrl: 'https://github.com/skrzeku/furniture_app',
    deploy: false,
      first_slide: 'furnitureslide1',
      sec_slide: 'furnitureslide2',
      third_slide: 'furnitureslide3'
  },



   ];
        //To flter of projects at the begin of component projects.length should be equal to 0
  filters: Filter[] = [];


  constructor(private render: Renderer2,
              private snack: MatSnackBar,
              public dialog: MatDialog,
              private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.BuildForm();
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const options = {
      strings: ['front-end <strong style="color: red">d</strong>eveloper', '<strong style="color: red">f</strong>ront-end developer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2100,
      loop: true,
      loopCount: Infinity,
    };

    const typed = new Typed('#typewrite', options);


    //this.anotherAnimate();

  }
  ngAfterViewInit() {
    this.about_position = this.about_section.nativeElement.getBoundingClientRect().top;
    this.portfolio_position = this.portfolio.nativeElement.getBoundingClientRect().top;
    this.contact_position = this.contact.nativeElement.getBoundingClientRect().top;
    this.abilities_position = this.abilities.nativeElement.getBoundingClientRect().top;

    this.SetDefaultPosition();

  }

  private BuildForm() {
    this.form = this.formbuilder.group({
      name: '',
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      content: ['', [Validators.required, Validators.maxLength(170)]]
    });
  }

  @HostListener('window:scroll', ['$event'])
  CheckScroll() {

    const CurrenScrollPosition = window.pageYOffset;
    this.CheckBoolean();

    if (CurrenScrollPosition >= this.about_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(0);
      this.about_header_boolean = true;
      this.AboutIcons();
    }

    if (CurrenScrollPosition >= this.abilities_position - 250) {
      this.RemoveClassActive();
      this.AddClassActive(1);
      this.skill_header_boolean = true;
      this.state = 'show';
      this.getpercentWidth();
      this.CheckSkills();


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

  AboutIcons() {
    if (window.pageYOffset >= this.about_position) {
      this.hobbyiconsshow = true;
      return false;
    }
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
   if (window.pageYOffset >= this.abilities_position) {
     this.skillsiconsshow = true;
     return false;
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
    elements.scrollIntoView({ block: 'nearest',  behavior: 'smooth' });
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
    this.snack.open('Email wysłany poprawnie', '', {
      duration: 256000
    });
  }
  getpercentWidth(): void {

    const back_el = document.querySelectorAll('li.progress-bar-striped');
    const all_spans = document.querySelectorAll('.percent_span');
    const el = document.querySelectorAll('li.progress-bar-striped div');


    const arrays = Array.from(el);

    let i = 0;
    let z = 0;
      let inter = setInterval(() => {
        if (z >= 110) {
        clearInterval(inter);
        }
        z++;
        arrays.forEach((span, index)=> {
          all_spans[index].innerHTML = Math.round((span.clientWidth / back_el[index].clientWidth) * 100).toString() + ' %';
        });

      }, 10);




  }
  ValidbeforeSend() {
    const el = this.errors.nativeElement as HTMLElement;
    if (this.form.invalid) {
      if (this.form.get('content').hasError('maxlength')) {
        this.error_text = 'BŁĄD! Przekroczono dopuszczalną ilośc znakow wiadomosci';
      }
      if (this.form.get('email').hasError('pattern')) {
        this.error_text = 'BŁĄD! Nieprawidłowy format adresu email (example@gmail.com)';
      }
      if (this.form.get('email').hasError('required')) {
        this.error_text = 'BŁĄD! Uzupełnij adres email';
      }
      if (this.form.get('content').hasError('required')) {
        this.error_text = 'BłĄD! Pole Treści jest wymagane';
      }
      this.render.addClass(el, 'errorsShow');
      setTimeout(() => {
        this.render.removeClass(el, 'errorsShow' );
      }, 5000);
    }
    else this.SendMail();
  }


  SendMail() {

    const data = {
      service_id: 'gmailskrzeku',
      template_id: 'mytemplate',
      user_id: 'user_7IplmzdpkPdh019K7I4Ey',
      template_params: {
        subject: this.form.get('name').value,
        text: this.form.get('content').value,
        from_email: this.form.get('email').value
      }
    };
    console.log(data);


    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(() => {
      this.showsuccess = true;
      setTimeout(() => {
        this.showsuccess = false;
      }, 5000);

    }).fail((error) => {
      alert('Oops... ' + JSON.stringify(error));
    });
  }



}
