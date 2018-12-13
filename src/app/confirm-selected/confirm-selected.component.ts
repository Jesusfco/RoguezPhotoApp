import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { cardPop, backgroundOpacity } from '../animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumClients } from '../album-clients';
import { AlbumPhotoClients } from '../album-photo-clients';
import { UserService } from '../user.service';
@Component({
  selector: 'app-confirm-selected',
  templateUrl: './confirm-selected.component.html',
  styleUrls: ['./confirm-selected.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class ConfirmSelectedComponent implements OnInit {

  state = {
    background: 'initial',
    card: 'initial',
  };

  albumPhotosObserver: any ;
  public request: Boolean = false;

  public album: AlbumClients =  new AlbumClients();

  @HostListener('document:keyup', ['$event']) sss($event) {

    if($event.keyCode === 27) {
      this.closePop();
    } 

  }

  constructor(private router: Router, private _http: UserService) { 

    this.setAlbumPhotosObserver();
  }

  ngOnInit() {

    setTimeout(() => {
      this.state.background = 'final';
      this.state.card = 'final';
    }, 10);

  }

  setAlbumPhotosObserver() {
    this.albumPhotosObserver = setInterval(() => this.albumPhotosObserverLogic(), 500);
  }

  albumPhotosObserverLogic() {
    if(sessionStorage.getItem('album') == undefined) return;

    this.album = JSON.parse(sessionStorage.getItem('album'));
    // this.album.setSelectedPhotos();
    let count = 0 ;
    
    for(let p of this.album.photos){

        if(p.select == true) { 
            count++;
        }
    }

    this.album.selected = count;

    clearInterval(this.albumPhotosObserver);

  }


  closePop(){

    setTimeout(() => {
      this.router.navigate(['/album/' + this.album.id ]);
    }, 450);

    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  sendSelection() {
    this.request = true;
    this._http.storeSelection({'photos': this.album.photos, 'album_id': this.album.id}).then(
      data => {


        let not = {
          title: 'Selección de Fotos Guardada',
          description: 'Datos cargados al servidor correctamente',
          status: 200
        };

        this.closePop();

        sessionStorage.setItem('albumSaved', '1');
        sessionStorage.setItem('request', JSON.stringify(not));
        
      },

      error => sessionStorage.setItem('request', JSON.stringify(error))
    ).then(
      () => this.request = false
    );
  }

}
