const apiService = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
    const headers = new Headers();
    const options: IOptions = {
        method,
        headers
    }
    
    if (method === 'POST' || method === 'PUT') {
        headers.append('Content-Type', 'application/json');
        options.body = JSON.stringify(body);
    }
    
    try {
        const res = await fetch(uri, options);

        if (res.status === 500) {
            throw new Error('Server Blew Up, probably');
        }

        if (res.status === 404) {
            throw new Error('Prolly a path typo');
        }

        if (res.status === 401) {
            throw new Error('Not logged in dummy');
        }

        if (res.ok) {
            return <T>await res.json();
        }

    } catch (error) {
        console.log(error);
    }

}


interface IOptions {
    [key: string]: any;
}

export default apiService;