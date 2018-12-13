import { Component, OnInit } from '@angular/core';
import { AlbumClients } from '../album-clients';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  public albums: Array<AlbumClients> = []
  public request: Boolean = false;
  public user: User = new User();

  constructor(private _http: UserService) { 

    this.user.setUserFromData();

    this.request = true;

    this._http.getAlbums().then(
      d => {
        let data: any = d
        for(let d of data) {
          
          let album: AlbumClients = new AlbumClients();
          album.setData(d);

          this.albums.push(album);


        }

        localStorage.setItem('albums', JSON.stringify(this.albums));

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))

    ).then(
      () => this.request = false
    );

  }



  ngOnInit() {
  }

}
