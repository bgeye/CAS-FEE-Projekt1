class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers({'content-type':'application/json', ...(headers || {})});
        console.log(method, url, data, headers);
        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)

        }).then(x => {
            console.log(x.json);
            return x.json();
        })
    }
}

export const httpService = new HttpService();