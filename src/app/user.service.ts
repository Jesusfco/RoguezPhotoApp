import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Url } from './url';
import { Storage } from './storage';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  private subject = new Subject<any>();  
  
  constructor(private _http: HttpClient) { }  

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  sendData(action: String, data: any) {
    let message = {
      action: action,
      data: data
    };
    this.subject.next(message);
  }

  login(information) {
    return this._http.post(this.link.url + 'login', information)
            
            .toPromise();
  }

  checkAuth() { 

    return this._http.get(this.link.url + 'checkAuth' + this.token.getTokenUrl())
    
    .toPromise();

  }

  getAlbums() { 

    return this._http.get(this.link.url + 'albums' + this.token.getTokenUrl())
    
            .toPromise();

  }

  getPhotos(id) {
    return this._http.get(this.link.url + 'album/' + id + this.token.getTokenUrl())
    
            .toPromise();
  }

  storeSelection(data) {
    
    return this._http.post(this.link.url + 'album/storeSelection' + this.token.getTokenUrl(), data)
            
            .toPromise();

  }

}
