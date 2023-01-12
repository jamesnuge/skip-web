export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    jwt: string
}

export const loginApi = {
    login: async (request: LoginRequest) => {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        return await response.json(); 
    }
}