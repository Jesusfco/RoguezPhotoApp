import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { ConfirmSelectedComponent } from './confirm-selected/confirm-selected.component';
import { SelectedPhotosComponent } from './selected-photos/selected-photos.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { AlbumComponent } from './album/album.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { NotificationComponent } from './notification/notification.component';
import { NavegationComponent } from './navegation/navegation.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavegationComponent,
    NotificationComponent,
    MyAlbumsComponent,
    AlbumComponent,
    PhotoViewComponent,
    SelectedPhotosComponent,
    ConfirmSelectedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpClientModule,
    
    BrowserAnimationsModule, 
    AppRoutingModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
