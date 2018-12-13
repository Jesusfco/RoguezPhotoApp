import { Component, OnInit } from '@angular/core';
import { FadeAnimation, SlideAnimation } from '../animations';
import { AlbumClients } from '../album-clients';

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

  constructor() {
    
    let album = JSON.parse(sessionStorage.getItem('album'));
    this.album.setData(album);
    this.album.setPhotosDataLike(album.photos);

    setTimeout(() => {

      this.setBackground();

    }, 100);
  }

  ngOnInit() {
  }

  likePhoto(pho) {
    pho.select = !pho.select;

    sessionStorage.setItem('photoChange', JSON.stringify(pho));

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
