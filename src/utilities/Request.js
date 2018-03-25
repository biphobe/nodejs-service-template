export default class Request {
    static send(url, options) {
        return fetch(url, options)
            .then(response => {
                if (response.status !== 200 && response.status !== 201) {
                    const error = new Error(`INVALID_HTTP_CODE_${response.status}`);

                    return Promise.reject(error);
                }

                const contentTypeHeader = response.headers.get("Content-Type");
                const isJson = ((contentTypeHeader || "").match("application/json"));

                if (isJson) {
                    return response.json();
                }

                return response.text();
            });
    }

    static async get(url, options = {}) {
        return this.send(url, {
            ...options,
            method: "GET"
        });
    }

    static async post(url, options = {}) {
        return this.send(url, {
            ...options,
            method: "POST"
        });
    }
}
