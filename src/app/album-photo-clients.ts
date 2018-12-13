import { Url } from './url';
export class AlbumPhotoClients {

    public id: number;
    public foreign_id: number;
    public img: String;
    public select: Boolean;
    public type: number;
    public order: number;

    // 0'https://cdn.dribbble.com/users/43718/screenshots/1137881/loadinganimation2.gif'
    public basicPath: String;
    

    constructor() {
        this.select = false;
    }   

    setFromData(data) {
        this.id = parseFloat(data.id);
        this.foreign_id = parseFloat(data.foreign_id);
        this.img = data.img;
        this.type = parseInt(data.type);

        if(parseInt(data.select) == 1 || data.select == true)
            this.select = true;
        this.order = parseFloat(data.order);
    }

    getPhotosStorage() {
        let  photos = [];

        if(localStorage.getItem('photos') == undefined) {
            return photos;
        }

        photos = JSON.parse(localStorage.getItem('photos'));

        return photos;
    }

    setPath(id){

        let p: Url = new Url();
        this.basicPath = p.basicUrl + 'img/app/works/' + id + '/' + this.img;
        

    }
}
