export class Url {
    public url: string;

    public basicUrl: String;

    constructor() {
        this.basicUrl = "http://www.lilianapineda.com/";
        // this.basicUrl = "http://localhost:8000/";

        this.setUrl();
    }

    setUrl() {
        this.url = this.basicUrl + 'api/';
    }
}
