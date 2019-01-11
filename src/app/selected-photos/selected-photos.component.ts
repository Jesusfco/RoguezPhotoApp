import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../animations';
import { AlbumClients } from '../album-clients';
import { UserService } from '../user.service';

@Component({
  selector: 'app-selected-photos',
  templateUrl: './selected-photos.component.html',
  styleUrls: ['./selected-photos.component.css'],
  animations: [FadeAnimation, SlideAnimation],
})
export class SelectedPhotosComponent implements OnInit {

  cardState: string = 'initial';
  backgroundState: string = 'initial';

  public album: AlbumClients = new AlbumClients();

  constructor(private _http: UserService) {                

    this._http.getData().subscribe(x => {      
      console.log(x);
      if (x.action == 'album_shared') {
        this.album.setData(x.data);
        this.album.setPhotosDataLike(x.data.photos);
        setTimeout(() => {

          this.setBackground();
    
        }, 100);
      }
        
      
    });
  }

  ngOnInit() {
  }

  likePhoto(pho) {
    pho.select = !pho.select;
    this._http.sendData('like', pho);    

  }

  setBackground() {
    
    for(let pho of this.album.photos) {

      let ps = document.getElementById('selected' + pho.id);
      ps.style.backgroundImage = 'url(' + pho.basicPath + ')';
      
      let width = ps.offsetWidth ;
      ps.parentElement.style.height = width + "px";

    }
  }

}
