import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Storage } from '../storage';
import { Router } from '@angular/router';
import { Url } from '../url';
// import { animations } from '../animations';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css'],  
  animations: [
    trigger('menu', [
      state('initial', style({
        transform: 'translate3d(0,0,0)',
        visibility: 'visible'
      })),

      state('final' ,style({
        transform: 'translate3d(-100%,0,0)',
        visibility: 'hidden'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
    
    trigger('space', [
      state('initial', style({
        padding: '60px 0px 0px 250px'
      })),

      state('final' ,style({
        padding: '60px 0px 0px 0px'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
  ]
})
export class NavegationComponent implements OnInit {

    @Output() closeSession= new EventEmitter();

    stateMenu: string;
    statePanel: string;

    userData: Storage = new Storage();
    public url: Url = new Url();

    view: any = {
      inventario: true,
      caja: false,
      puntoVenta: false,
    }

    public menuBoolean: Boolean = false;

    constructor( private router: Router) { }            

    sideNav(){
        if(window.screen.width < 750){
          this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
          // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
  
        } else {
          this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
          this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
        }
  
        
      }
  
    ngOnInit() {
      if(window.screen.width < 750){
        this.stateMenu = "final";
        this.statePanel = 'final';
      } else {
        this.stateMenu = "initial";
        this.statePanel = 'initial';
      }

      this.stateMenu = "final";
        this.statePanel = 'final';

    }

    cerrarSesion(){
        localStorage.clear();
        location.reload();
        // this.cerrarSesion.emit();
    }

    closeNavMov(){
        if(window.screen.width < 750){
            this.stateMenu = "final";
            // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');

        } 
    }

    redirect(url) {
      this.closeNavMov();
      this.router.navigate([url]);
    }

    menuAction() {
      

      if(this.menuBoolean == false) {
        this.menuBoolean = true;

        let b1 = document.getElementById('bodyMove1');
        let b2 = document.getElementById('bodyMove2');
        let b3 = document.getElementById('shadowMenu');

        b1.classList.add('bodyMove');
        b2.classList.add('bodyMove');
        b3.classList.add('display');

        b1.classList.add('active');
        b2.classList.add('active');

        setTimeout(() => {
          b3.classList.add('active');
        }, 1);
        

      } else {
        this.menuBoolean = false;

        let b1 = document.getElementById('bodyMove1');
        let b2 = document.getElementById('bodyMove2');
        let b3 = document.getElementById('shadowMenu');

        b1.classList.remove('active');
        b2.classList.remove('active');
        b3.classList.remove('active');

        setTimeout(() => {
          b1.classList.remove('bodyMove');
          b2.classList.remove('bodyMove');
          b3.classList.remove('display');
        }, 700);
        
      }
    }

    
}
