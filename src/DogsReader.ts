export default class DogsReader {
    private url: string;
    private extensions: string[];

    constructor(url: string, extensions: string[]) {
        this.url = url;
        this.extensions = extensions;
    }

    public async getUrls(count: number) {
        const requests = [];
        for(let i=0; i<count; i++) {
            requests.push(this.getUrl());        
        }
        return await Promise.all(requests);
    }

    public async getUrl (tries = 3): Promise<string> {
        const noData = "";

        try {
            const response = await fetch(this.url);
            const json = await response.json();
            if (json.url.startsWith("http")) {
                if (!this.extensions.some(ext => json.url.endsWith(ext))) {
                    if (tries > 1) {
                        return await this.getUrl(tries--); // unsupported ext - try again
                    }
                    else {
                        return noData; // unsupported ext - no tried left
                    }
                }
            }
            else {
                return noData; // returned some unexpected data - error text etc.
            }

            return json.url;
            // return "https://random.dog/ee17f54a-83ac-44a3-8a35-e89ff7153fb4.jpg";
            // return "https://random.dog/1f6dba4e-1043-4d38-85ed-f7bc14e67538.mp4";
        }
        catch (e) {
            return noData;
        }

    }

}

