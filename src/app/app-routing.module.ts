import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { AlbumComponent } from './album/album.component';
import { PhotoViewComponent } from './photo-view/photo-view.component';
import { SelectedPhotosComponent } from './selected-photos/selected-photos.component';
import { ConfirmSelectedComponent } from './confirm-selected/confirm-selected.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'myAlbums', component: MyAlbumsComponent },

    { path: 'album/:id', component: AlbumComponent, 
        children: [
            { path: 'show/:id', component: PhotoViewComponent },
            { path: 'selected', component: SelectedPhotosComponent },
            { path: 'confirm', component: ConfirmSelectedComponent },

        ] 
    },
    
    { path: '**', component:  PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
