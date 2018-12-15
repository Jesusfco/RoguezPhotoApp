import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { AlbumClients } from '../album-clients';
import { AlbumPhotoClients } from '../album-photo-clients';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  observerRef: any;

  public album: AlbumClients = new AlbumClients();
  public request: Boolean = false;
  public photoChangeObserver: any;
  public albumSavedObserver: any;
  public observerService: any;

  constructor(private _http: UserService,
    private router: Router,
    private actRou: ActivatedRoute) { 
      

      this.observerRef = actRou.params.subscribe(params => {

        this.album.id = params['id'];
        this.getPhotos();
        
      });

      this._http.getData().subscribe(x => {      
      
        if (x.action == 'like') 
          this.photoLike(x.data);        
        else if(x.action == 'saved') 
          this.albumSaved();        
        
      });

      this.sendAlbum();

    }

  ngOnInit() {
  }

 
  sendAlbum() {
    setTimeout(() => {
      this._http.sendData('album_shared', this.album);  
    }, 200);    
  }
  refreshStorageAlbum() {
    sessionStorage.setItem('album', JSON.stringify(this.album));
  }

  photoLike(photo) {  

    for(let i = 0; i < this.album.photos.length; i++) {
      
      if(this.album.photos[i].id == photo.id) {

        this.album.photos[i].select = photo.select;
        break;

      }

    }

    this.refreshStorageAlbum();

  }

  albumSaved() {    
    this.album.work_status_id = 2;
    this.refreshStorageAlbum();    
  }

  getPhotos() {
    
    this.request = true;

    this._http.getPhotos(this.album.id).then(

      data => {
        let d: any = data
        this.album.setData(d.album);
        this.album.setPhotosData(d.photos);
        this.sendAlbum();
        sessionStorage.setItem('album', JSON.stringify(this.album));        

        setTimeout(() => {

          this.setBackground();

        }, 100);
        

      },

      error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    );

  }

  setBackground() {
    
    for(let pho of this.album.photos) {

      let ps = document.getElementById('photo' + pho.id);
      ps.style.backgroundImage = 'url(' + pho.basicPath + ')';
      
      let width = ps.offsetWidth ;
      ps.parentElement.style.height = width + "px";

    }
  }

  likePhoto(photo) {
    // console.log(photo
    photo.select = !photo.select;
    this.refreshStorageAlbum();
    
  }

}
