export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    jwt: string
}

const serverUrl = process.env.SKIP_DATA_SERVER_URL || 'localhost:3000'

export const loginApi = {
    login: async (request: LoginRequest) => {
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