import { Url } from './url';
import { AlbumPhotoClients } from './album-photo-clients';

export class AlbumClients {

    public id: number;
    public client_id: number;
    public name: String;
    public img: String;
    public disponible: number = 0;
    public selected: number = 0;
    public date: String;
    public status: Number;
    public created_at: String;
    public updated_at: String;

    public photoPath: String;
    public photoPath2: String;

    public photos: Array<AlbumPhotoClients> = [];

    constructor() {
        this.selected = 0;
    }


    setPhotoPath() {
        let n: Url = new Url();
        this.photoPath = n.basicUrl + 'images/aplication/clients/' +  this.id + '/principal_' + this.img;
        this.photoPath2 = n.basicUrl + 'images/aplication/clients/' +  this.id + '/secundaria_' + this.img;
    }

    setSelectedPhotos() {

        let count = 0 ;
    
        for(let p of this.photos){

            if(p.select == true) { 
                count++;
            }
        }

        this.selected = count;
    }

    countSelectedPhoto() {

        let count = 0 ;
    
        for(let p of this.photos){
            if(p.select == true){ 
                count++;
            }
        }

        return count;

    }

    setData(data) {

        this.id = parseInt(data.id);
        this.client_id = parseInt(data.client_id);
        this.name = data.name;
        this.img = data.img;
        this.disponible = parseInt(data.disponible);
        this.date = data.date;
        this.status = parseInt(data.status);

        this.setPhotoPath();

    }

    setPhotosData(data) {

        this.photos = [];

        for(let d of data) {

            let pho: AlbumPhotoClients = new AlbumPhotoClients();
            pho.setFromData(d);
            pho.setPath(this.id);
            this.photos.push(pho);

        }

    }

    setPhotosDataLike(data) {

        this.photos = [];

        for(let d of data) {
            
            if(d.select == true) {

                let pho: AlbumPhotoClients = new AlbumPhotoClients();
                pho.setFromData(d);
                pho.setPath(this.id);
                pho.select = true;
                this.photos.push(pho);

            }
            

        }

    }
}
