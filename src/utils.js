export const fetchData = (endpoint, method, body) => {
    try {
        return fetch(endpoint, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).catch(e => {
            console.log('error in util for endpoint:', endpoint)
            throw e
        })
    } catch (e) {
        console.log('caught in util:', e.toString())
    }
}

