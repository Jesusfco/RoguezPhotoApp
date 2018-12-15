import { Url } from './url';
import { AlbumPhotoClients } from './album-photo-clients';

export class AlbumClients {

    public id: number;
    public user_id: number;
    public title: String;
    public resume: String;
    public description: String;
    public cost: number;
    public img: String;
    public photos_quantity: number = 0;
    public selected: number = 0;
    
    public work_status_id: Number;
    public created_at: String;
    public updated_at: String;

    public photoPath: String;
    

    public photos: Array<AlbumPhotoClients> = [];

    constructor() {
        this.selected = 0;
    }


    setPhotoPath() {
        let n: Url = new Url();
        this.photoPath = n.basicUrl + 'img/app/works/' +  this.id + '/' + this.img;
        
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
        this.user_id = parseInt(data.user_id);
        this.title = data.title;
        this.resume = data.resume;
        this.img = data.img;
        this.photos_quantity = parseInt(data.photos_quantity);
        console.log(this.photos_quantity);
        
        this.created_at = data.created_at;
        this.work_status_id = parseInt(data.work_status_id);

        if(data.photos != undefined) {
            
            this.photos = [];

            for(let pho of data.photos) {
                let photo = new AlbumPhotoClients();
                photo.setFromData(pho);
                this.photos.push(photo);
            }

        }

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
