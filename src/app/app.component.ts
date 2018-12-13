import { Component,  } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Storage } from './storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loaderImg', [
      
      state('initial', style({
        transform: 'translate3d(0,80%,0) scale(.7)',        
        opacity: 0
      })),

      state('final' , style({
        transform: 'translate3d(0,0,0) scale(1)',       
        opacity: 1
      })),      

      transition('initial <=> final' , animate('1000ms ease-out')),
    ]),

    trigger('loader', [
      
      state('initial', style({        
        opacity: 1
      })),

      state('final' , style({
        display: 'none',       
        opacity: 0
      })),      

      transition('initial <=> final' , animate('500ms ease-out')),
    ])

  ]
})
export class AppComponent {
  stateLoaderImg: string = "initial";
  stateLoader: string = "initial";

  storage: Storage = new Storage();

  loginObserverInterval: any;

  constructor(private _http: UserService, private router: Router) {

    // localStorage.setItem('out_conection', '0');
    localStorage.setItem('login', '0');

  }

  ngOnInit(){
    
    setTimeout(() => {
      
      this.loaderAnimationImg();      
      
      if (this.storage.token == null || this.storage.token == ''){  
      
          this.router.navigate(['/login']);
 
          setTimeout(() => {
            this.loaderAnimation();
          }, 600);
          return;
      }

        
      this.checkLogin();

    }, 100);

  }

  loaderAnimationImg(){
    this.stateLoaderImg = (this.stateLoaderImg === 'initial' ? 'final' : 'initial');
  }
  loaderAnimation(){
    this.stateLoader = (this.stateLoader === 'initial' ? 'final' : 'initial');
  }

  checkLogin(){

    this._http.checkAuth().then(

      d => {
        let data: any = d
        localStorage.setItem('login', '1');
        this.storage.storageUserData(data.user);

        setTimeout(() => {

          this.loaderAnimation();

          if (this.router.url == '/login'){

            this.router.navigate(['/myAlbums']);

          }

        }, 800);

      },

      error =>  {

        sessionStorage.setItem('request', JSON.stringify(error));
        localStorage.removeItem('token');
        this.router.navigate(['/login']);

        setTimeout(() => {

          this.loaderAnimation();

        }, 800);
  
      } // Fin del Error
  
    );
      
  }
}
