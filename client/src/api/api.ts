import 'whatwg-fetch'; // fetch polifill
import {toast} from 'react-toastify';

interface IApiService {
    get: (url: string, data: object, options: object) => Promise<Response | never | never>
    remove: (url: string, data: object, options: object) => Promise<Response | never | never>
    removeJSON: (url: string, data: object, options: object) => Promise<Response | never | never>
    post: (url: string, data: object, options: object) => Promise<Response | never | never>
    postJSON: (url: string, data: object, options: object) => Promise<Response | never | never>
    postFile: (url: string, file: any, options: object) => Promise<Response | never | never>
    getFileAsDataUrl: (url: string, options: object) => Promise<Response | never | never>
    put: (url: string, data: object, options: object) => Promise<Response | never | never>
    putJSON: (url: string, data: object, options: object) => Promise<Response | never | never>
}

class ApiService implements IApiService {

    public get (url: string, data={}, options={}) {
        const requestData = generateFormData(data);
        const requestUrl = requestData ? `${url}?${requestData}` : url;
        const getData = () => fetchData(requestUrl, {
            method: 'GET',
            ...options
        });

        return getData();
    }

    public remove (url: string, data={}, options:any={}) {
        const requestData = generateFormData(data);
        const requestUrl = requestData ? `${url}?${requestData}` : url;
        const getData = () => fetchData(requestUrl, {
            method: 'DELETE',
            ...options
        });

        return getData();
   };

    public removeJSON (url: string, data={}, options:any={}) {
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = '*/*';
        const removeData = () => fetchData(url, {
            method: 'DELETE',
            ...options,
            body: JSON.stringify(data)
        });

        return removeData();
    };

    public post (url: string, data={}, options:any={}) {
        const postData = () => fetchData(url, {
            method: 'POST',
            ...options,
            body: generateFormData(data)
        });

        return postData();
    };

    public postJSON (url: string, data={}, options:any={}) {
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';
        const postData = () => fetchData(url, {
            method: 'POST',
            ...options,
            body: JSON.stringify(data)
        });

        return postData();
    };

    public postFile (url:string, file:any=null, options:any={}) {
        options.headers = options.headers || {};
        const formData = new FormData();
        formData.append('file', file);
        const postData = () => fetchData(url, {
            'method': 'POST',
            'Content-Type': false,
            ...options,
            'body': formData
        });

        return postData();
    };

    public getFileAsDataUrl (url:string, options:any={}) {
        const getData = () => fetchData(url, {
            'Content-Type': false,
            ...options
        });

        return getData();
    };

    public put (url:string, data={}, options:any={}) {
        const putData = () => fetchData(url, {
            method: 'PUT',
            ...options,
            body: generateFormData(data)
        });

        return putData();
    };

    public putJSON (url:string, data={}, options:any={}) {
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = '*/*';
        const putData = () => fetchData(url, {
            method: 'PUT',
            ...options,
            body: JSON.stringify(data)
        });

        return putData();
    };

}


const fetchData = (url:string, options:any={}) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...getHeadersWithAuthorization(options.headers),
    };
    if (options['Content-Type'] === false) {
        delete headers['Content-Type'];
    }
    return fetch(url, {...options, headers})
        .then(handleErrors)
        .then(handleResponse)
        .catch((e) => {
            throw e;
        });
};

const generateFormData = (obj:any) => {
    let formData = '';
    for (let key in obj ) {
        if (obj[key] || obj[key] === 0 || obj[key] === '') {
            // eslint-disable-next-line
            if (formData != '') {
                formData += '&';
            }
            if (obj[key] === '') formData += key;
            else formData += key + '=' + encodeURIComponent(obj[key]);
        }
    }
    return formData;
};

/**
 * check if token expires
 */
export const isAccessTokenExpired = () => {
    const accessTokenExpDate = parseInt(localStorage.getItem('expiresIn') || '', 10);
    const nowTime = Math.floor(Date.now());
    return accessTokenExpDate <= nowTime;
};

/**
 * check if response correct and extract data
 */
const handleResponse = (response:Response) => {
        const contentType = response.headers.get('content-type');
        if (contentType && (contentType.indexOf('image') !== -1)) {
            return response.blob()
            .then((blob) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as any);
                reader.onerror = reject;
                if (blob.size) reader.readAsDataURL(blob);
                    else resolve(undefined);
            }));
        } else {
            return response.text().then((text) => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return text ? text: {};
                }
            });
        }
    };

const throwNetworkError = (remoteError:Error, response:Response) => {
    if (response.status === 401) throw new AuthError(remoteError.message);
    if (response.status === 404) throw new NotFoundError(remoteError.message);
    if (response.status === 400) throw new BadRequestError(remoteError.message);
    else throw Error(remoteError.message);
};

const handleErrors = (response:Response) => {
    return response.ok ?
        Promise.resolve(response)
        :
        response.json()
            .then((e) => throwNetworkError(e, response))
            .catch((e) => throwNetworkError(e, response));
};

const getHeadersWithAuthorization = (headers:any) => {
    const token = getAccessToken();
    const authorization = 'Bearer ' + token;
    return token ? {...headers, authorization} : {...headers};
};

/**
 * get accessToken from storage
 */
const getAccessToken = () => localStorage.getItem('accessToken');

/**
 * get refreshToken from storage
 */
// const getRefreshToken = () => localStorage.getItem('refreshToken');

/**
 *  set tokens to storage
 */
export const setAuthData = (data:any) => {
    localStorage.setItem('accessToken', data.access_token);
    localStorage.setItem('refreshToken', data.refresh_token);
    localStorage.setItem('expiresIn', (Date.now() + data.expires_in*1000).toString());

    // Extract data from JWT
    const base64Url = data.access_token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let userInfo = null;
    try {
        userInfo = JSON.parse(window.atob(base64));
        console.log(userInfo)
        localStorage.setItem('username', userInfo.username);
        localStorage.setItem('role', userInfo.role);
    } catch (e) {
        console.log(e);
    }
};

/**
 * Authentication error
 */
export class AuthError extends Error {
    constructor(...props:any[]) {
        super(...props);
        this.name = 'AuthError';
    }
}

/**
 * Bad request error
 */
export class BadRequestError extends Error {
    constructor(...props:any[]) {
        super(...props);
        this.name = 'BadRequestError';
    }
}

/**
 * Not found error
 */
export class NotFoundError extends Error {
    constructor(...props:any[]) {
        super(...props);
        this.name = 'NotFoundError';
    }
}

const api = new ApiService();

export const { 
    get,
    remove,
    removeJSON,
    post,
    postJSON,
    postFile,
    getFileAsDataUrl,
    put,
    putJSON,
} = api;


/**
 * TODO - rewrite on thunk
 * @param dispatch 
 * @param error 
 * @param customErrorHandlers 
 */
export const handleError = (error: Error, customErrorHandlers={}) => {
    const toastId = 'connectionError';

    const errorHandlers: any = {
        'AuthError': (data: any) => {
            toast('Ошибка авторизации', {type: 'error', toastId: data.toastId});
        },
        'BadRequestError': (data: any) => toast(data.error.message, {type: 'error', toastId: data.toastId}),
        'NotFoundError': (data: any) => toast('Запрашиваемый ресурс не найден', {type: 'error', toastId: data.toastId}),
        'unknownError': (data: any) => toast('Ошибка соединения', {type: 'error', toastId: data.toastId}),
        ...customErrorHandlers
    };
    
    const errorHandler = errorHandlers[error.name] || errorHandlers.unknownError;
    errorHandler({toastId, error});
};
