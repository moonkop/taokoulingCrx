interface simpleParams {
    [key: string]: string | number | boolean;
}

function buildParmStr (params: simpleParams): string {
    return Object.keys(params).map(key => {
        return key + '=' + params[key];
    }).join('&');
}

export async function request (
    {
        url, params, httpType = 'GET',
    }: {
        url: string,
        params?: simpleParams,
        body?: simpleParams
        httpType?: 'POST' | 'GET',
    }): Promise<{ res?: any, err?: any }> {
    if (params) {
        url += '?' + buildParmStr(params);
    }
    return new Promise((resolve) => {
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            resolve({res});
        })
            .catch(err => {
                resolve({err})
            });
    })

}