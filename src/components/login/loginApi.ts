export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    jwt: string
}

export const loginApi = {
    login: async (request: LoginRequest) => {
        const serverUrl = getServerUrl();
        const response = await fetch(`http://${serverUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        return await response.json(); 
    }
}

var serverUrl

export const getServerUrl = () => {
    console.log(process.env)
    console.log(`server env variable is: ${process.env.REACT_APP_SERVER_URL}`)
    if (process.env.REACT_APP_SERVER_URL) {
        return process.env.REACT_APP_SERVER_URL
    } else {
        return 'localhost:3000'
    }
}