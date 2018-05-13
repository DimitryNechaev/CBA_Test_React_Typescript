export default class DogsReader {
    // tslint:disable-next-line:variable-name
    private _url: string;

    constructor(url: string) {
        this._url = url;
    }

    public async getUrls(count: number) {
        const requests = [];
        for(let i=0; i<count; i++) {
            requests.push(this.getUrl());        
        }
        return await Promise.all(requests);
    }

    public async getUrl () {
        const response = await fetch(this._url);
        const json = await response.json();
        return json.url;
    }
}

