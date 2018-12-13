export class Storage {
    token: string;
    tokenUrl: string;
    userName: string;
    userEmail: string;
    userId: number;
    userType: number;
    userPhone: string;

    constructor(){

        this.token = localStorage.getItem('token');
        this.tokenUrl = '?token=' + this.token;
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
        this.userId = parseInt(localStorage.getItem('userId'));
        this.userType = parseInt(localStorage.getItem('userType'));
        this.userPhone = localStorage.getItem('userPhone');
    }

    storageToken(token){
        localStorage.setItem('token', token);
    }

    getTokenUrl(){
        return '?token=' + localStorage.getItem('token');
    }

    storageUserData(data){
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userType', data.level);
        
    }
    

    getName(){
        return localStorage.getItem('userName');
    }
    getEmail(){
        return localStorage.getItem('userEmail');
    }

    
    getUserType(){
        return parseInt(localStorage.getItem('userType'));
    }

    
}
