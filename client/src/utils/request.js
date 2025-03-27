const requester = async(method, url, data, options = {}) => {
    if(method !== 'GET') {
        options.method = method;
    }

    if(data) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headrs,
            },
            body: JSON.stringify(data),
        }
    }
    try {
        const response = await fetch(url, options);
        const responseContentType = response.headers.get('Content-Type');
        if(!responseContentType) {
            return;
        }
        const result = await response.json();
        return result;
    } catch(err){
        throw new Error(err.message)
    }
    
};

export default {
    get: requester.bind(null, 'GET'),
    post: requester.bind(null, 'POST'),
    put: requester.bind(null, 'PUT'),
    delete: requester.bind(null, 'DELETE'),
    baseRequester: requester,
}
    