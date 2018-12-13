import { Component, OnInit } from '@angular/core';
import { Url } from '../url';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  public url: Url = new Url();
  
  constructor() { }

  ngOnInit() {
  }

  checkToken(){
    if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== '') return true;
    return false;
  }

}
