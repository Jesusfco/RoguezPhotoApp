export class User {
    public id: number;
    public name: String;
    public email: String;
    public password: String;
    public level: Number;
    public phone: String;
    public created_at: String;
    public updated_at: String;
    

    constructor() {
        this.level = 0;
    }

    setFromData(data) {
        
        this.id = parseInt(data.id);
        this.name = data.name;
        this.email = data.email;
        this.level = parseInt(data.level);
        this.phone = data.phone;

    }

    storageData(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    setUserFromData(){
        let user = JSON.parse(localStorage.getItem('user'));
        this.setFromData(user);
    }

}
