import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../storage';
import { User } from '../user';
import { UserService } from '../user.service';
import { useAnimation } from '@angular/animations';
import { Url } from '../url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public data: any = {
    email: '',
    password: ''
  };

  public form = {
    email: 0,
    password: 0,
    credentials: 0,
    form: true,
  };

  public sendingData: Boolean = false;

  public storage: Storage =  new Storage();
  public user: User = new User();
  public url: Url = new Url();

  constructor(private _http:  UserService, private router: Router) { }

  ngOnInit() {
    
  }
  accesar() {

    this.restoreValidation();
    this.validateMail();
    this.validatePassword();

    if(this.form.form == false)  return; 

    
    this.sendingData = true;

    this._http.login(this.data).then(
      d => {
        let data: any = d
        this.storage.storageToken(data.token);
        this.storage.storageUserData(data.user);
        this.user.storageData(data.user);
        this.router.navigate(['/myAlbums']);
        sessionStorage.setItem('login', '1');
      },
      error => {

        if(error.status == 401) {
          this.form.credentials = 1;
        }
        sessionStorage.setItem('request', JSON.stringify(error));
        console.log(error);
      }
    ).then(
      () => this.sendingData = false
    );
  }

  validateMail(){

    this.form.email = 0;
    this.data.email = this.data.email.replace(/\s+$/, '');

    if(this.data.email == '') {
      this.form.email = 1;
      this.form.form = false;
    }    
  }

  validatePassword(){
    this.form.password = 0;
    this.data.password = this.data.password.replace(/\s+$/, '');

    if(this.data.password == '') {
      this.form.password = 1;
      this.form.form = false;
    }
  }

  restoreValidation() {

    this.form = {
      email: 0,
      password: 0,
      form: true,
      credentials: 0,
    };

  }
  

}
