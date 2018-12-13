import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { cardPop, backgroundOpacity } from '../animations';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumClients } from '../album-clients';
import { AlbumPhotoClients } from '../album-photo-clients';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.css'],
  animations: [cardPop, backgroundOpacity]
})
export class PhotoViewComponent implements OnInit {

  photoBefore: number;
  photoAfter: number;

  observerRef: any;

  public album: AlbumClients =  new AlbumClients();
  public photo: AlbumPhotoClients = new AlbumPhotoClients();
  
  state = {
    background: 'initial',
    card: 'initial',
  };

  albumPhotosObserver: any ;
  changeAlbumPhotoObserver: any ;
  observerPhotoData: any;

  public touch: any = {
    touchStart: 0,
    touchMove: 0,
    touchFinish: 0,


    touchClicked: 0
  };

  @HostListener('document:mousedown', ['$event']) msas($event) {
    
    
    if($event.button == 2) { // right click
      return false; // do nothing!
    }

    // if($event.keyCode === 27) {
    //   this.closePop();
    // } else if($event.keyCode == 39 ) {
    //   this.swipeLeft();
    // } else if($event.keyCode == 37 ) {
    //   this.swipeRight();
    // } else if($event.keyCode == 76 ) { 
    //   this.likePhoto();
    // }

  }

  @HostListener('document:keyup', ['$event']) sss($event) {
    
    

    if($event.keyCode === 27) {
      this.closePop();
    } else if($event.keyCode == 39 ) {
      this.swipeLeft();
    } else if($event.keyCode == 37 ) {
      this.swipeRight();
    } else if($event.keyCode == 76 ) { 
      this.likePhoto();
    }

  }

  constructor(private router: Router,
              private actRou: ActivatedRoute) {


                
                this.observerRef = actRou.params.subscribe(params => {
                  this.photo = new AlbumPhotoClients();
                  this.photo.id = params['id'];
                  this.setObserverPhotoData();
                  
                });
                
                this.setAlbumPhotosObserver();
                this.setObserverChangeAlbum();  
                
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
    this.setPhoto();
    this.getBeforeAfterProduct();
    clearInterval(this.albumPhotosObserver);

  }

  setObserverChangeAlbum() {
    this.changeAlbumPhotoObserver = setInterval(() => this.changeAlbumObserverLogic(), 500);
  }

  changeAlbumObserverLogic() {

    if(sessionStorage.getItem('albumCharge') == undefined) return;

    this.album = JSON.parse(sessionStorage.getItem('album'));
    this.setPhoto();
    this.getBeforeAfterProduct();
    sessionStorage.removeItem('albumCharge');
    

  }

  setPhoto() {
    let exist = false;
    
    for(let pho of this.album.photos) {

      if(pho.id == this.photo.id) {
        this.photo.setFromData(pho);
        exist = true;
        break;
      }

    }

    if(!exist) { this.closePop();}

  }


  swipeLeft(){
    document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(-800px)";

        setTimeout(() => {
          this.router.navigate(['/album/' + this.album.id + '/show/' + this.photoAfter]);
          document.getElementById('card').classList.remove('time');
          document.getElementById('card').style.transform = "translateX(800px)";

          setTimeout(() => {
            document.getElementById('card').classList.add('time');
            document.getElementById('card').style.transform = "translateX(0px)";

            setTimeout(() => {
              document.getElementById('card').classList.remove('time');

            }, 400);

          }, 10);
          
        }, 400);
  }

  swipeRight() {

    document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(800px)";

        setTimeout(() => {
          this.router.navigate(['/album/' + this.album.id + '/show/' + this.photoBefore]);
          document.getElementById('card').classList.remove('time');
          document.getElementById('card').style.transform = "translateX(-800px)";

          setTimeout(() => {
            document.getElementById('card').classList.add('time');
            document.getElementById('card').style.transform = "translateX(0px)";

            setTimeout(() => {
              document.getElementById('card').classList.remove('time');

            }, 400);

          }, 10);
          
        }, 400);

  }

  getBeforeAfterProduct(){
    let x = this.album.photos.length;

    
    for(let i = 0; i < this.album.photos.length; i++){

      if(this.album.photos[i].id == this.photo.id){

        this.photoAfter = i + 1;
        this.photoBefore = i - 1;

        if(this.photoBefore == -1){
          this.photoBefore = this.album.photos[x - 1].id;
        } else {
          this.photoBefore = this.album.photos[this.photoBefore].id;
        }

        if(this.photoAfter == x){
          this.photoAfter = this.album.photos[0].id;
        } else {
          this.photoAfter = this.album.photos[this.photoAfter].id;
        }

        break;
      }

    }

  }

  closePop(){

    setTimeout(() => {
      this.router.navigate(['/album/' + this.album.id ]);
    }, 450);
    this.state.background = 'initial';
    this.state.card = 'initial';
    
  }

  likePhoto() {
    this.photo.select = !this.photo.select;
    sessionStorage.setItem('photoChange', JSON.stringify(this.photo));

    for(let i = 0; i < this.album.photos.length; i++) {
      
      if(this.album.photos[i].id == this.photo.id) {
        this.album.photos[i] = this.photo;
      }

    }

  }

  @HostListener('document.getElementById("card"):touchmove', ['$event']) doSomething($event) {
    
    this.touch.touchMove = $event.changedTouches[0].clientX - this.touch.touchStart;
    document.getElementById('card').style.transform = "translateX(" + this.touch.touchMove + "px)";

  }

  @HostListener('document.getElementById("card"):touchstart', ['$event']) setInit($event) {
    
    this.touch.touchStart = $event.changedTouches[0].clientX;

  }

  @HostListener('document.getElementById("card"):touchend', ['$event']) decideFinal($event) {

      this.touch.touchFinish = $event.changedTouches[0].clientX;

      if(this.touch.touchMove <= -150){

        this.swipeLeft();

      } else if (this.touch.touchMove >= 150) {

        this.swipeRight();

      } else {

        document.getElementById('card').classList.add('time');
        document.getElementById('card').style.transform = "translateX(0px)";

        setTimeout(() => {

          document.getElementById('card').classList.remove('time');

        }, 400);

      }
    
  }

  setObserverPhotoData() {
    this.observerPhotoData = setInterval(() => this.observerPhotoDataLogic(), 200);
  }

  observerPhotoDataLogic() {
    
    let exist = false;
    
    for(let pho of this.album.photos) {

      if(pho.id == this.photo.id) {
        this.photo.setFromData(pho);
        this.photo.setPath(this.album.id);
        exist = true;
        this.getBeforeAfterProduct();
        break;
      }

    }

    if(exist) {
      clearInterval(this.observerPhotoData);
    }
  
    
  }

}
