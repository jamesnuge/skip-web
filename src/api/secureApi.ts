import { fetchTokenFromStorage, storeToken } from "../App"

export const secureApi = {
    post: async (path: string, body: any, ) => {
        const response = await fetch(`/api/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(body)
        })
        return handleResponse(response);
    },
    put: async (path: string, body: any, ) => {
        const response = await fetch(`/api/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(body)
        })
        return handleResponse(response);
    },
    get: async (path: string) => {
        const response = await fetch(`/api/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            }
        })
        return handleResponse(response);
    }
}

const handleResponse = (response: Response) => {
    if (response.status === 401) {
        console.warn('Could not perform action with current credentials, please login to verify authentication')
        storeToken('');
        window.location.reload()
    }
    return response;
}