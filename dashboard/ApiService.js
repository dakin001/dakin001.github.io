export class ApiService {
    constructor(callback) {
        this.callback = callback;

        this.ajax = this.ajax.bind(this);
    }

    callback;
    ajax(url) {
        let current = this;
        current.callback({
            isLoading: true
        })

        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        current.callback({
                            error: undefined,
                            isLoading: false
                        })

                        resolve(result)
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        current.callback({
                            error: error,
                            isLoading: false
                        })
                        reject(error);
                    }
                )
        })


    }
}

export const apiService = {
    Instance: null,
};
